from db.models import Event
from db import db

def get_events():
    return [result.to_dict() for result in Event.query.all()]

def create_event(event):
    new_event = Event(**event)
    db.session.add(new_event)
    db.session.commit()
    return new_event.to_dict()

def update_event(id, event):
    Event.query.filter_by(id=id).update(event)
    updated_event = Event.query.get(id)
    db.session.commit()
    return updated_event and update_event.to_dict()