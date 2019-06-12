from flask import Blueprint
from flask import jsonify
from flask import request

blueprint = Blueprint('api/events', __name__, url_prefix='/events')

@blueprint.route('/', methods=['POST'])
def post_events():
	event_json = request.get_json()
	new_event = Event(**event_json)

	Event.add(new_event)

	return jsonify(new_event)
