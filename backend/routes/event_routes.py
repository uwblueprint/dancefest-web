from flask import Blueprint
from flask import request
from flask import jsonify

from datetime import datetime

from ..db.models import Event
from ..db import db
from ..utils.constants import DATE_FORMAT


blueprint = Blueprint('events', __name__, url_prefix='/events')


@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'


@blueprint.route('/<event_id>', methods=['POST'])
def update_event(event_id):
	event = Event.query.get(event_id)

	event.event_date = datetime.strptime(request.args['event_date'], DATE_FORMAT)
	event.event_title = request.args['event_title']
	event.num_judges = request.args['num_judges']

	db.session.commit()

	return jsonify(event.to_dict())


@blueprint.route('/', methods=['POST'])
def post_events():
	event_json = request.get_json()

	event_json['event_date'] = datetime.strptime(event_json['event_date'], DATE_FORMAT)
	new_event = Event(**event_json)

	db.session.add(new_event)
	db.session.commit()

	return jsonify(new_event.to_dict())
