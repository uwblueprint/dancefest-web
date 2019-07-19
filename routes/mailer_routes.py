from flask import Blueprint, request
from flask_mail import Message
from server import mail

blueprint = Blueprint('mailer', __name__, url_prefix='/mailer')


@blueprint.route('/', methods=['POST'])
def send_mail():
    args = request.get_json()
    title = "Hello"
    msg = Message(title, recipients=args['recipients'])
    msg.body = "Hi"
    mail.send(msg)
    return "Success"
