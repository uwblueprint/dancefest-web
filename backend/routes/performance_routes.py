from flask import Blueprint
from flask import jsonify, request
from ..db.models import Adjudication, AwardPerformance, Performance

blueprint = Blueprint('performance', __name__, url_prefix='/performances')


@blueprint.route('/', methods=['POST'])
def create_performance():
	performance_json = request.get_json()
	new_performance = Performance.create(**performance_json)
	return jsonify(new_performance.to_dict())

@blueprint.route('<performance_id>', methods = ['GET'])
def get_performance(performance_id):
	performance = Performance.get(performance_id)
	return jsonify(performance.to_dict())

@blueprint.route('/<performance_id>', methods=['POST'])
def update_performance(performance_id):
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

@blueprint.route('/<award_id>', methods=['GET'])
def get_performances(award_id):
	performances = Performance.query.join(AwardPerformance, AwardPerformance.performance_id == Performance.id).filter(AwardPerformance.award_id == award_id)
	return jsonify({ performance.id: performance.to_dict() for performance in performances })

@blueprint.route('/<performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
	adjudications = Adjudication.get_by(performance_id=performance_id)
	return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})
	
@blueprint.route('/<performance_id>/adjudications', methods=['POST'])
def create_adjudication(performance_id):
    adjudication_json = request.get_json()
    adjudication_json['performance_id'] = performance_id
    new_adjudication = Adjudication.create(**adjudication_json)

    return jsonify(new_adjudication.to_dict())    
