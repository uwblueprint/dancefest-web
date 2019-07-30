from flask import Blueprint
from flask import jsonify, request

from sqlalchemy.orm import joinedload

from db.models import Adjudication
from db.models import AwardPerformance
from db.models import Performance
from db.models import NominationComment

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

@blueprint.route('/<int:performance_id>', methods=['POST'])
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


@blueprint.route('/<award_id>/awards', methods=['GET'])
def get_performances_adjudications_by_award(award_id):
    performances = Performance.query \
    .filter(Performance.award_performance.any(award_id = award_id)) \
    .all()
    return jsonify({performance.id: performance.to_dict(True) for performance in performances})


@blueprint.route('/<list:performance_ids>/adjudications', methods=['GET'])
def get_adjudications_by_performance(performance_ids):
    adjudications = Adjudication.query.filter(Adjudication.performance_id.in_(performance_ids)).all()
    performance_to_adjudication = {}
    for adjudication in adjudications:
        performance_id = adjudication.performance_id
        if performance_id not in performance_to_adjudication:
            performance_to_adjudication[performance_id] = {}
        performance_to_adjudication[performance_id][adjudication.id] = adjudication.to_dict()
    return jsonify(performance_to_adjudication)


@blueprint.route('/<int:performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
    # Query by performance id and any additional query parameters provided
    adjudication_filter = request.args.to_dict()
    adjudications = Adjudication.get_by(performance_id=performance_id, **adjudication_filter)
    return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})


@blueprint.route('/<int:performance_id>/adjudications', methods=['POST'])
def create_adjudication(performance_id):
    adjudication_json = request.get_json()
    adjudication_json['performance_id'] = performance_id
    new_adjudication = Adjudication.create(Adjudication,**adjudication_json)
        
    return jsonify(new_adjudication.to_dict(True, 'performance'))

@blueprint.route('/<int:performance_id>/adjudications/<int:award_id>/comments', methods=['GET'])
def get_adjudications_and_comments(performance_id, award_id):
    adjudication_comments = Adjudication.query \
        .filter(Adjudication.performance_id == performance_id) \
        .filter(NominationComment.award_id == award_id) \
        .all()
<<<<<<< HEAD:routes/performance_routes.py
    return jsonify({adjudication_comment.id: adjudication_comment.to_dict(True) for adjudication_comment in adjudication_comments})
=======
    return jsonify({adjudication_comment.id: adjudication_comment.to_dict(True, ['performance']) for adjudication_comment in adjudication_comments})
>>>>>>> 497b0a4ff33c9a628ca792b02a1be88aa415cfdb:backend/routes/performance_routes.py
