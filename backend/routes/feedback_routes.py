from flask import Blueprint, jsonify, request
from flask_mail import Message

from services import school_service, performance_service
from server import mail
import json

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

    with mail.connect() as conn:
        for school_id, school in res.items():
            print(school)
            if 'contacts' in school:
                contacts = school['contacts']
                recipients = [contact['teacher_email'] for contact in contacts if 'teacher_email' in contact]
                
                msg = Message("Feedback", recipients=["ericfeng610@gmail.com"])
                msg.html = json.dumps(school)
                conn.send(msg)

    return jsonify(res), 200

@blueprint.route('<int:school_id>', methods=['GET'])
def send_email(school_id):
    school = school_service.get_school(school_id)

    performance_filter = {'school_id': [str(school['id'])]}
    performances = performance_service.get_performances(performance_filter)

    school['performances'] = performances

    msg = Message("Feedback", recipients=["ericfeng610@gmail.com"])
    msg.html = "<b>" + json.dumps(school) + "</b>"

    mail.send(msg)


    return jsonify(school), 200
