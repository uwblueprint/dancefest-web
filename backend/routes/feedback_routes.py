from flask import Blueprint, jsonify, request

from services import feedback_service, school_service, performance_service

blueprint = Blueprint('feedback', __name__, url_prefix='/api/feedback')

@blueprint.route('/', methods=['GET'])
def send_emails():
    schools_info = school_service.get_schools()
    performance_filter = {'school_id': [str(id) for id in schools_info.keys()]}
    performances = performance_service.get_performances(performance_filter)

    for performance in performances:
        school_id = performance['school_id']
        if "performances" not in schools_info[school_id]:
            schools_info[school_id]["performances"] = [performance]
        else:
            schools_info[school_id]["performances"].append(performance)

    return jsonify(schools_info), 200

