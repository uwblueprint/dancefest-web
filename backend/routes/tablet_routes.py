from flask import Blueprint
from flask import jsonify, request
from ..db.models import Tablet

blueprint = Blueprint('tablet', __name__, url_prefix='/tablets')


@blueprint.route('/', methods=['POST'])
def create_tablet():
	tablet_json = request.get_json()
	new_tablet = Tablet.create(**tablet_json)
	return jsonify(new_tablet.to_dict())


@blueprint.route('/<tablet_serial>', methods=['GET'])
def get_adjudications(tablet_serial):
	tablet = Tablet.get_by(serial=tablet_serial, first=True)
	return jsonify(tablet.to_dict())
	