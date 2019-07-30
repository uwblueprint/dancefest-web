from flask import Blueprint, request
from flask_mail import Message
from server import mail

blueprint = Blueprint('mailer', __name__, url_prefix='/mailer')


@blueprint.route('/', methods=['POST'])
def send_mail():
    args = request.get_json()
    title = "Hi from Dance Fest!"
    msg = Message(title, recipients=args['recipients'])
    link = "https://dancefest-backend-app-inital.herokuapp.com/school/{}/{}".format(args['event_id'], args['token'])
    msg.body = "Hi {}, Here is your link to view your school's results: {}".format(args['teacher_contact'], link)
    mail.send(msg)
    return "Success"
