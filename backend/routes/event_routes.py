from datetime import datetime

from flask import Blueprint
from flask import jsonify
from flask import request


<<<<<<< HEAD
from ..db.models import Event
from ..db.models import Performance
=======
from ..db.models import Event, Performance
>>>>>>> a4905a871ac1eea6edc1df322469af7b97443884
from ..utils.constants import DATE_FORMAT

blueprint = Blueprint('events', __name__, url_prefix='/events')


@blueprint.route('/<event_id>', methods=['POST'])
def update_event(event_id):
    event = Event.query.get(event_id)

    event_json = request.get_json()
    event_json['event_date'] = datetime.strptime(
        event_json['event_date'], DATE_FORMAT)

    event.update(**event_json)

    return jsonify(event.to_dict())


@blueprint.route('/', methods=['POST'])
def create_event():
    event_json = request.get_json()

    event_json['event_date'] = datetime.strptime(
        event_json['event_date'], DATE_FORMAT)
    new_event = Event.create(**event_json)

    return jsonify(new_event.to_dict())


@blueprint.route('/')
def get_events():
    events = Event.query.all()
    return jsonify({event.id: event.to_dict() for event in events})

#TODO: re-org where the endpoints go especially this one and update api specs
@blueprint.route('/<event_id>/performances')
def get_performances(event_id):
	all_performances = Performance.get_by(**{"event_id": event_id})
	return jsonify({performance.id: performance.to_dict() for performance in all_performances})
