from flask import Blueprint
from flask import jsonify, request
from ..db.models import Performance
from flask import abort
from ..db.models import Adjudication

blueprint = Blueprint('performance', __name__, url_prefix='/events')


@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Performances Backend!'

@blueprint.route('/<event_id>/performances/<performance_id>', methods=['POST'])
def update_performance(event_id, performance_id):
	'''
	Requires post body in the following format:
	{
		school: <string>,
		performers: Array<string>,
		dance_title: <Int>,
		dance_style: <string>,
		dance_entry: <Int>,
		dance_size: <String>,
		competition_level: <String>,
		choreographers: Array<string>,
		academic_level: <string>	
	}
	Returns data in the following format
	{
		school: <string>,
		performers: Array<string>,
		dance_title: <Int>,
		dance_style: <string>,
		dance_entry: <Int>,
		dance_size: <String>,
		competition_level: <String>,
		choreographers: Array<string>,
		academic_level: <string>	
	}
	'''
	performance = Performance.query.get(performance_id)
	performance_json = request.get_json()
	performance.update(**performance_json)

	return jsonify(performance.to_dict())

@blueprint.route('/<performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
	adjudications = Adjudication.get_by(performance_id=performance_id)
	return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})