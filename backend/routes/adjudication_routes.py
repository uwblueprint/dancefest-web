from flask import Blueprint
from flask import jsonify, request
from ..db.models import Adjudication

blueprint = Blueprint('adjudication', __name__, url_prefix='/adjudications')

@blueprint.route('/<adjudications_id>', methods=['POST'])
def update_adjudication(adjudications_id):
	adjudication = Adjudication.get(adjudications_id)
	adjudication_json = request.get_json()
	adjudication.update(**adjudication_json)

	return jsonify(adjudication.to_dict())
    