from flask import Blueprint
from flask import jsonify, request
from ..db.models import Performance
from ..db.models import Adjudication

blueprint = Blueprint('performance', __name__, url_prefix='/performances')


<<<<<<< HEAD
@blueprint.route('/<event_id>/performances', methods=['POST'])
def create_performance(event_id):
    performance_json = request.get_json()
    new_performance = Performance.create(**performance_json)
    return jsonify(new_performance.to_dict())


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
=======
@blueprint.route('/', methods=['POST'])
def create_performance():
	performance_json = request.get_json()
	new_performance = Performance.create(**performance_json)
	return jsonify(new_performance.to_dict())


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
>>>>>>> a4905a871ac1eea6edc1df322469af7b97443884


@blueprint.route('/<performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
<<<<<<< HEAD
    adjudications = Adjudication.get_by(performance_id=performance_id)
    return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})


@blueprint.route('/<event_id>/performances')
def get_performances(event_id):
    all_performances = Performance.get_by(**{"event_id": event_id})
    return jsonify({performance.id: performance.to_dict() for performance in all_performances})
=======
	adjudications = Adjudication.get_by(performance_id=performance_id)
	return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})
	
@blueprint.route('/<performance_id>/adjudications', methods=['POST'])
def create_adjudication(performance_id):
    adjudication_json = request.get_json()
    adjudication_json['performance_id'] = performance_id
    new_adjudication = Adjudication.create(**adjudication_json)

    return jsonify(new_adjudication.to_dict())    
>>>>>>> a4905a871ac1eea6edc1df322469af7b97443884
