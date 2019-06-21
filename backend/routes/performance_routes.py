from flask import Blueprint
from flask import jsonify
from flask import request
from flask import abort
from ..db.models import Adjudication

blueprint = Blueprint('performance', __name__, url_prefix='/performances')


@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'

@blueprint.route('/<performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
	adjudications = Adjudication.get_by(performance_id=performance_id)
	return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})
