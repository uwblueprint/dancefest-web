from flask import Blueprint, jsonify, request
import logging
from services import feedback_service, school_service, performance_service

blueprint = Blueprint('feedback', __name__, url_prefix='/api/feedback')

@blueprint.route('/', methods=['GET'])
def send_emails():
    schools = school_service.get_schools()

    res = {school['id']: school for school in schools}

    performance_filter = {'school_id': [str(school_id) for school_id in res.keys()]}
    performances = performance_service.get_performances(performance_filter)

    for performance in performances:
        school_id = performance['school_id']
        if 'performances' not in res[school_id]:
            res[school_id]['performances'] = [performance]
        else:
            res[school_id]['performances'].append(performance)

    return jsonify(res), 200

@blueprint.route('<int:school_id>', methods=['GET'])
def send_email(school_id):
    school = school_service.get_school(school_id)

    performance_filter = {'school_id': [str(school['id'])]}
    performances = performance_service.get_performances(performance_filter)

    return jsonify(performances), 200
