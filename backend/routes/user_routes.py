import dateutil.parser
from flask import Blueprint
from flask import jsonify
from flask import request

from db.models import User, UserTypes

blueprint = Blueprint('user', __name__, url_prefix='/api/user')


@blueprint.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({user.id: user.to_dict() for user in users})


@blueprint.route('<uid>', methods=['GET'])
def get_user_by_uid(uid):
    user = User.get_by(first=True, uid=uid)
    if not user:
        return jsonify({})
    return jsonify(user.to_dict())
