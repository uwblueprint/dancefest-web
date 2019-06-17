from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty
from flask_sqlalchemy import SQLAlchemy
from . import db


class Event(db.Model):
    __tablename__ = 'event'

    id = db.Column(db.Integer, primary_key=True)
    event_title = db.Column(db.String(255))
    num_judges = db.Column(db.Integer)
    event_date = db.Column(db.Date)

    def to_dict(self):
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
        return formatted


class Performance(db.Model):
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

    def to_dict(self):
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
        return formatted


class Adjudication(db.Model):
    __tablename__ = 'adjudication'

    id = db.Column(db.Integer, primary_key=True)
    artistic_mark = db.Column(db.Integer)
    audio_url = db.Column(db.String(255))
    cumulative_mark = db.Column(db.Integer)
    tablet_id = db.Column(db.Integer)
    notes = db.Column(db.String(255))
    special_award = db.Column(db.Boolean)
    technical_mark = db.Column(db.Integer)
    performance_id = db.Column(db.Integer, db.ForeignKey('performance.id'))

    def to_dict(self):
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
        return formatted

