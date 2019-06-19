from flask import Blueprint
from flask import request
from flask import jsonify
from flask import json
from ..db.models import Event

from datetime import datetime

from ..db.models import Event
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
def main():
    events = Event.query.all()
    all_events = {}

    for event in events:
        all_events[event.id] = {
            "eventId": event.id,
            "eventTitle": event.event_title,
            "numJudges": event.num_judges,
            "eventDate": event.event_date
        }

    return jsonify(all_events)
