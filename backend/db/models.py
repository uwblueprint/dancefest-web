from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty
from sqlalchemy.ext.declarative import declarative_base
from . import db

class Base:
    def asdict(self):
        return {c.key: getattr(self, c.key)
                for c in inspect(self).mapper.column_attrs}

BaseModel = declarative_base(cls=Base)

class Event(BaseModel):
    __tablename__ = 'event'

    id = db.Column(db.Integer, primary_key=True)
    event_title = db.Column(db.String(255))
    num_judges = db.Column(db.Integer)
    event_date = db.Column(db.Date)


class Performance(BaseModel):
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


class Adjudication(BaseModel):
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
