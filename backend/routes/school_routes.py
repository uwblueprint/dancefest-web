import uuid

from flask import Blueprint, jsonify, request

# remove unnecessary imports
from db.models import Performance, School

from services import school_service

blueprint = Blueprint('school', __name__, url_prefix='/api/school')

@blueprint.route('/', methods=['GET'])
def get_schools():
    """Gets all schools

    Returns:
        Data for all schools
    """
    schools = school_service.get_schools()
    return jsonify(schools), 200

@blueprint.route('/<int:id>', methods=['GET'])
def get_school(id):
    """Gets school by id

    Returns:
        school with provided id
    """
    school = school_service.get_school(id)
    if school is None:
        error = {'error': 'School not found'}
        return jsonify(error), 404

    return jsonify(school), 200

#TODO: Figure out use case? 
@blueprint.route('<event_id>/<token>', methods=['GET'])
def get_performances_by_token(event_id, token):
    school = School.get_by(first=True, token=token)
    if not school:
        return jsonify({})
    performances = Performance.get_by(school=school.name, event_id=event_id)
    return jsonify({performance.id: performance.to_dict() for performance in performances})


