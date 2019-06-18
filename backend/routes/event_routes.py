from flask import Blueprint
from flask import jsonify
from flask import request
from datetime import datetime

from ..db.models import Event
from ..db import db
from ..utils.constants import DATE_FORMAT

blueprint = Blueprint('events', __name__, url_prefix='/api/events')

@blueprint.route('/', methods=['POST'])
def post_events():
	event_json = request.get_json()

	event_json['event_date'] = datetime.strptime(event_json['event_date'], DATE_FORMAT)
	new_event = Event(**event_json)

	db.session.add(new_event)
	db.session.commit()

	return jsonify(new_event.asdict())
