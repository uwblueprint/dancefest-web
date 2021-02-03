from collections import Iterable

from sqlalchemy import inspect
from sqlalchemy.orm import relationship
from sqlalchemy.orm.properties import ColumnProperty

from . import db


class BaseMixin:
    __table_args__ = {'extend_existing': True}

    @classmethod
    def get(cls, _id):
        return cls.query.get(int(_id))

    @classmethod
    def get_by(cls, first=False, **kwargs):
        rows = cls.query.filter_by(**kwargs)
        if first:
            return rows.first()
        return rows.all()

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return self.save() if commit else self

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception:
                db.session.rollback()
                raise
        return self

    def delete(self, commit=True):
        db.session.delete(self)
        return commit and db.session.commit()

    def to_dict(self, include_relationships=False, ignore_cols=[]):
        cls = type(self)
        # `mapper` allows us to grab the columns of a Model
        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            attr = getattr(self, field)
            if column.key not in ignore_cols:
                # If it's a regular column, extract the value
                if isinstance(column, ColumnProperty):
                    formatted[field] = attr
                # Otherwise, it's a relationship field
                elif include_relationships and attr:
                    # Recursively format the relationship
                    # Don't format the relationship's relationships
                    if isinstance(attr, Iterable):
                        # When the relationship contains many objects
                        formatted[field] = [obj.to_dict() for obj in attr]
                    else:
                        # Format obj in many to one relationship
                        formatted[field] = attr.to_dict()
        return formatted


class UserTypes(db.Model, BaseMixin):
    __tablename__ = 'user_type'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(255))


class User(db.Model, BaseMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    # reference to firebase object
    uid = db.Column(db.String(255))
    user_type = db.Column(db.Integer, db.ForeignKey('user_type.id'))


class Event(db.Model, BaseMixin):
    __tablename__ = 'event'

    id = db.Column(db.Integer, primary_key=True)
    event_title = db.Column(db.String(255))
    num_judges = db.Column(db.Integer)
    event_date = db.Column(db.Date)


class Performance(db.Model, BaseMixin):
    __tablename__ = 'performance'

    id = db.Column(db.Integer, primary_key=True)
    academic_level = db.Column(db.String(255))
    choreographers = db.Column(db.ARRAY(db.String(255)))
    competition_level = db.Column(db.String(255))
    dance_size = db.Column(db.String(255))
    dance_entry = db.Column(db.Integer)
    dance_style = db.Column(db.String(255))
    dance_title = db.Column(db.String(255))
    performers = db.Column(db.ARRAY(db.String(255)))
    token = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    adjudications = relationship('Adjudication', backref='performance')
    award_performance = relationship('AwardPerformance', back_populates='performance', lazy='noload')


class Adjudication(db.Model, BaseMixin):
    __tablename__ = 'adjudication'

    id = db.Column(db.Integer, primary_key=True)
    artistic_mark = db.Column(db.Integer)
    audio_url = db.Column(db.String(255))
    cumulative_mark = db.Column(db.Integer)
    notes = db.Column(db.String(255))
    special_award = db.Column(db.Boolean)
    technical_mark = db.Column(db.Integer)
    tablet_id = db.Column(db.Integer, db.ForeignKey('tablet.id'), index=True)
    performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))
    nomination_comment = relationship('NominationComment', back_populates="adjudication")

    #TODO: shouldn't this be in create_adjudications in service instead?
    @classmethod
    def create(cls, **kwargs):
        if 'nomination_comment' in kwargs:
            nomination_comments = kwargs['nomination_comment']
            del kwargs['nomination_comment']
            new_adjudication = super(Adjudication, self).create(**kwargs)

            # get the awards the performance has already been nominated for
            awards_nominated_for = [id for id, in db.session.query(AwardPerformance.award_id).filter_by(
                performance_id=kwargs['performance_id']).distinct()]

            for comment in nomination_comments:
                # increase nominee count if performance hasn't already been nominated
                if comment['award_id'] not in awards_nominated_for:
                    award = Award.get(comment['award_id'])
                    award.nominee_count = Award.nominee_count + 1
                    Award.update(award)

                # create nomination comments
                comment['adjudication_id'] = new_adjudication.id
                NominationComment.create(**comment)
                AwardPerformance.create(
                    **{'award_id': comment['award_id'], 'performance_id': new_adjudication.performance_id})
            return new_adjudication
        else:
            return super(Adjudication, Adjudication).create(**kwargs)


class School(db.Model, BaseMixin):
    __tablename__ = 'school'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    address = db.Column(db.String(255))
    district = db.Column(db.String(255))


class SchoolContact(db.Model, BaseMixin):
    __tablename__ = 'school_contact'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    year = db.Column(db.String(255))
    teacher_name = db.Column(db.String(255))
    teacher_email = db.Column(db.String(255))
    teacher_phone = db.Column(db.String(255))
    token = db.Column(db.String(255))

class Award(db.Model, BaseMixin):
    __tablename__ = 'award'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    nominee_count = db.Column(db.Integer)
    winning_performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))
    award_performance = relationship('AwardPerformance', back_populates='award')


class AwardPerformance(db.Model, BaseMixin):
    __tablename__ = 'award_performance'

    id = db.Column(db.Integer, primary_key=True)
    award_id = db.Column(db.Integer, db.ForeignKey('award.id'))
    performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))
    performance = relationship('Performance')
    award = relationship('Award', back_populates='award_performance')


class NominationComment(db.Model, BaseMixin):
    __tablename__ = 'nomination_comment'

    id = db.Column(db.Integer, primary_key=True)
    adjudication_id = db.Column(db.Integer, db.ForeignKey('adjudication.id'))
    award_id = db.Column(db.Integer, db.ForeignKey('award.id'))
    comment = db.Column(db.String)
    adjudication = relationship("Adjudication", back_populates="nomination_comment")


class Tablet(db.Model, BaseMixin):
    __tablename__ = 'tablet'

    id = db.Column(db.Integer, primary_key=True)
    serial = db.Column(db.String(255), nullable=False, index=True, unique=True)
