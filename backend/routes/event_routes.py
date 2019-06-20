from flask import Blueprint
from flask import request
from flask import jsonify

from datetime import datetime

from ..db.models import Event
from ..db import db
from ..utils.constants import DATE_FORMAT


blueprint = Blueprint('events', __name__, url_prefix='/events')


@blueprint.route('/<event_id>', methods=['POST'])
def update_event(event_id):
	event = Event.query.get(event_id)

	event_json = request.get_json()
	event_json['event_date'] = datetime.strptime(event_json['event_date'], DATE_FORMAT)

	return jsonify(event.to_dict())


@blueprint.route('/', methods=['POST'])
def post_events():
	event_json = request.get_json()

	event_json['event_date'] = datetime.strptime(event_json['event_date'], DATE_FORMAT)
	new_event = Event.create(**event_json)

	return jsonify(new_event.to_dict())
