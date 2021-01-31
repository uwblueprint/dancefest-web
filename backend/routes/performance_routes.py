import uuid

from flask import Blueprint, jsonify, request

# TODO: get rid of unnecessary imports
from db.models import Adjudication
from db.models import NominationComment
from db.models import Performance

from resources.performance_resource import PerformanceResource
from services import performance_service

blueprint = Blueprint('performance', __name__, url_prefix='/api/performances')

@blueprint.route('<int:id>', methods=['GET'])
def get_performance(id):
    """Gets performance by id

    Returns:
        performance with provided id
    """
    performance = performance_service.get_performance(id)
    if performance is None:
        error = {'error': 'Performance not found'}
        return jsonify(error), 404

    return jsonify(performance), 200

# TODO: double check that frontend is passing choreographers and performers as a list
@blueprint.route('/', methods=['POST'])
def create_performance():
    """Creates a performance

    Request Body:
        school_id: integer
        performers: list of strings
        dance_title: string
        dance_style: string
        dance_entry: integer
        dance_size: string
        competition_level: string
        choreographers: list of strings
        academic_level: string

    Returns:
        data for created performance
    """
    try:
        body = PerformanceResource(**request.get_json())

    except Exception as error:
        error = {'error': str(error)}

        return jsonify(error), 400

    return jsonify(performance_service.create_performance(body.__dict__)), 201

@blueprint.route('/<int:id>', methods=['PUT'])
def update_performance(id):
    """Updates a performance with provided id

    Request Body:
        school_id: integer
        performers: list of strings
        dance_title: string
        dance_style: string
        dance_entry: integer
        dance_size: string
        competition_level: string
        choreographers: list of strings
        academic_level: string

    Returns:
        updated performance
    """
    try:
        body = PerformanceResource(**request.get_json())
    except Exception as error:
        error = {'error': str(error)}
        return jsonify(error), 400

    updated_performance = performance_service.update_performance(id, body.__dict__)

    if updated_performance is None:
        error = {'error': 'Performance not found'}
        return jsonify(error), 404
    
    return jsonify(updated_performance), 200


# TODO: what is the use case for?
@blueprint.route('/<int:award_id>/awards', methods=['GET'])
def get_performances_adjudications_by_award(award_id):
    performances = Performance.query \
        .filter(Performance.award_performance.any(award_id=award_id)) \
        .all()
    return jsonify({performance.id: performance.to_dict(True) for performance in performances})

#TODO: Move to Adjudications, refactor with common GET route
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

#TODO: Move to Adjudications, refactor with common GET route
@blueprint.route('/<int:performance_id>/adjudications', methods=['GET'])
def get_adjudications(performance_id):
    # Query by performance id and any additional query parameters provided
    adjudication_filter = request.args.to_dict()
    adjudications = Adjudication.get_by(performance_id=performance_id, **adjudication_filter)
    return jsonify({adjudication.id: adjudication.to_dict() for adjudication in adjudications})

#TODO: Move to Adjudications, refactor with common GET route
@blueprint.route('/<int:performance_id>/adjudications', methods=['POST'])
def create_adjudication(performance_id):
    adjudication_json = request.get_json()
    adjudication_json['performance_id'] = performance_id
    new_adjudication = Adjudication.create(**adjudication_json)

    return jsonify(new_adjudication.to_dict(True, 'performance'))

#TODO: Move to Adjudications, refactor with common GET route
@blueprint.route('/<int:performance_id>/adjudications/<int:award_id>/comments', methods=['GET'])
def get_adjudications_and_comments(performance_id, award_id):
    adjudication_comments = Adjudication.query \
        .filter(Adjudication.performance_id == performance_id) \
        .filter(NominationComment.award_id == award_id) \
        .all()

    return jsonify(
        {adjudication_comment.id: adjudication_comment.to_dict(True, ['performance']) for adjudication_comment in
         adjudication_comments})

#TODO: Tablet ID? Change formatting of route
@blueprint.route('/<event_id>/<tablet_id>/adjudications', methods=['GET'])
def get_performance_adjudication_pairs(event_id, tablet_id):
    performances = Performance.get_by(event_id=event_id)
    pairs = []
    for p in performances:
        a = Adjudication.get_by(first=True, performance_id=p.id, tablet_id=tablet_id)
        pairs.append({
            "performance": p.to_dict(),
            "adjudication": a if a is None else a.to_dict()
        })
    return jsonify(pairs)
