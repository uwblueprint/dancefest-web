import dateutil.parser
from flask import Blueprint, jsonify, request

#TODO: remove unnecssary imports
from db.models import Event, Performance, Adjudication, School
from db import db

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

# TODO: re-org where the endpoints go especially this one and update api specs
# TODO: retrive all necessary metadata about the event here
# '/<int:event_id>'
@blueprint.route('/<event_id>/performances')
def get_performances(event_id):
    all_performances = db.session.query(Performance, School.name) \
        .outerjoin(School, Performance.school_id==School.id) \
        .filter(Performance.event_id == event_id)
    return jsonify({
        performance.id: {'performance': performance.to_dict(), 'school_name': school_name} for performance, school_name in all_performances
    })