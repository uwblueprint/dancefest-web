from flask import Blueprint
from flask import jsonify, request
from ..db.models import Adjudication

blueprint = Blueprint('adjudication', __name__, url_prefix='/adjudications')

@blueprint.route('/<adjudication_id>', methods=['POST'])
def update_adjudication(adjudication_id):
	adjudication = Adjudication.get(adjudication_id)
	adjudication_json = request.get_json()
	adjudication.update(**adjudication_json)

	return jsonify(adjudication.to_dict())
