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

@blueprint.route('/', methods=['GET'])
def get_performances():
    """Gets performances with provided filter

    Request Parameters: 
    - event_id
        Filters for all performances matching event_id passed in
        Example: ?event_id=1 to get performances for event_id=1

    Returns:
        performances that match filter
    """
    performance_filter = request.args.to_dict()

    performances = performance_service.get_performances(performance_filter)

    return jsonify(performances), 200

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


# TODO: This is for getting all performances for a specific awards
# Shouldbe in awards route
@blueprint.route('/<int:award_id>/awards', methods=['GET'])
def get_performances_adjudications_by_award(award_id):
    performances = Performance.query \
        .filter(Performance.award_performance.any(award_id=award_id)) \
        .all()
    return jsonify({performance.id: performance.to_dict(True) for performance in performances})

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