from flask import Blueprint
from flask import request
from flask import jsonify
from ..db.models import Event
from ..db import db

from datetime import datetime

blueprint = Blueprint('event', __name__, url_prefix='/events')


@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'


@blueprint.route('/<event_id>', methods=['POST'])
def update_event(event_id):
	event = Event.query.get(event_id)

	str_format = '%Y-%m-%d'

	event_date = datetime.strptime(request.args['event_date'], str_format)
	event_title = request.args['event_title']
	num_judges = request.args['num_judges']

	event.event_date = event_date
	event.event_title = event_title
	event.num_judges = num_judges

	db.session.commit()

	return jsonify(event.to_dict())
