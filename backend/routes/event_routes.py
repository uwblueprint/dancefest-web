import dateutil.parser
from flask import Blueprint, jsonify, request

from resources.event_resource import EventResource
from services import event_service

blueprint = Blueprint('events', __name__, url_prefix='/api/events')

@blueprint.route('/', methods=['GET'])
def get_events():
    """Gets all events

    Returns:
        all events
    """
    events = event_service.get_events()
    return jsonify(events), 200

@blueprint.route('/', methods=['POST'])
def create_event():
    """Creates an event

    Request Body:
        event_title: string
        num_judges: integer
        event_date: string in format: DD/MM/YYYY

    Returns:
        data for created event
    """
    try:
        body = EventResource(**request.get_json())
    except Exception as error:
        error = {'error': str(error)}
        return jsonify(error), 400

    return jsonify(event_service.create_event(body.__dict__)), 201

@blueprint.route('/<int:id>', methods=['PUT'])
def update_event(id):
    """Updates event with provided id

    Request Body:
        event_title: string
        num_judges: integer
        event_date: string in format: DD/MM/YYYY

    Returns:
        updated event
    """
    try:
        body = EventResource(**request.get_json())
    except Exception as error:
        error = {'error': str(error)}
        return jsonify(error), 400

    updated_event = event_service.update_event(id, body.__dict__)

    if updated_event is None:
        error = {'error': 'Event not found'}
        return jsonify(error), 404

    return jsonify(updated_event), 200