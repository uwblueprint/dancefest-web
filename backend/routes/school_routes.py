import uuid

from flask import Blueprint, jsonify, request

from db.models import Performance, School

blueprint = Blueprint('school', __name__, url_prefix='/api/school')

@blueprint.route('<school_id>', methods=['GET'])
def get_school(school_id):
    schools = School.get_by(id=school_id)
    return jsonify({school.id: school.to_dict() for school in schools})


@blueprint.route('<event_id>/<token>', methods=['GET'])
def get_performances_by_token(event_id, token):
    school = School.get_by(first=True, token=token)
    if not school:
        return jsonify({})
    performances = Performance.get_by(school=school.name, event_id=event_id)
    return jsonify({performance.id: performance.to_dict() for performance in performances})


@blueprint.route('/', methods=['GET'])
def get_schools():
    schools = School.query.all()
    return jsonify({school.id: school.to_dict() for school in schools})
