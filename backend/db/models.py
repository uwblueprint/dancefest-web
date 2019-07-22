from sqlalchemy import inspect
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

    def to_dict(self, include_relationships=False):
        cls = type(self)
        # `mapper` allows us to grab the columns of a Model
        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            attr = getattr(self, field)
            # If it's a regular column, extract the value
            if isinstance(column, ColumnProperty):
                formatted[field] = attr
            # Otherwise, it's a relationship field
            elif include_relationships:
                # Recursively format the relationship
                # Don't format the relationship's relationships
                formatted[field] = [obj.to_dict() for obj in attr]
        return formatted


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
    school = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))


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


class School(db.Model, BaseMixin):
    __tablename__ = 'school'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    address = db.Column(db.String(255))
    district = db.Column(db.String(255))
    teacher_contact = db.Column(db.String(255))
    teacher_email = db.Column(db.String(255))
    teacher_phone = db.Column(db.String(255))
    token = db.Column(db.String(255))
	
class Award(db.Model, BaseMixin):
	__tablename__ = 'award'

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(255))
	event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
	winning_performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))

class AwardPerformance(db.Model, BaseMixin):
	__tablename__ = 'award_performance'

	id = db.Column(db.Integer, primary_key=True)
	award_id = db.Column(db.Integer, db.ForeignKey('award.id'))
	performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))

class NominationComments(db.Model, BaseMixin):
	__tablename__ = 'nomination_comments'

	id = db.Column(db.Integer, primary_key=True)
	adjudication_id = db.Column(db.Integer, db.ForeignKey('adjudication.id'))
	award_id = db.Column(db.Integer, db.ForeignKey('award.id'))
	comment = db.Column(db.String)	


class Tablet(db.Model, BaseMixin):
    __tablename__ = 'tablet'

    id = db.Column(db.Integer, primary_key=True)
    serial = db.Column(db.String(255), nullable=False, index=True, unique=True)
