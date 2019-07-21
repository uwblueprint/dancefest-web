from flask import Blueprint, jsonify, request
from ..db.models import Performance, School
import uuid

blueprint = Blueprint('school', __name__, url_prefix='/school')


@blueprint.route('<token>', methods=['GET'])
def get_performances_by_token(token):
    school = School.get_by(first=True, token=token)
    if not school: return jsonify({})
    performances = Performance.get_by(school=school.name)
    return jsonify({performance.id: performance.to_dict() for performance in performances})


@blueprint.route('/token', methods=['POST'])
def generate_token():
    token = uuid.uuid4().hex
    args = request.get_json()
    school = School.get_by(first=True, name=args['school'])
    school.update(token=token)
    return jsonify(school.to_dict())
