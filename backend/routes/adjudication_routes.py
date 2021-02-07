from flask import Blueprint, jsonify, request

from db.models import Adjudication, Performance
from db import db

from resources.adjudication_resource import AdjudicationResource
from services import adjudication_service

blueprint = Blueprint('adjudication', __name__, url_prefix='/api/adjudications')

@blueprint.route('<int:id>', methods=['GET'])
def get_adjudication(id):
    """Gets adjudication by id

    Returns:
        adjudication with provided id
    """

    adjudication = adjudication_service.get_adjudication(id)
    
    if adjudication is None:
        error = {'error': 'Performance not found'}
        return jsonify(error), 404

    return jsonify(adjudication), 200

@blueprint.route('/', methods=['GET'])
def get_adjudications():
    """Gets adjudications grouped by the performance they are associated with

    Request Parameters: 
    - performance_id
        Filters to only retrieve adjudications for performance_id passed in
        Example: ?performance_id=1,2 to get adjudications for performance_id of 1 and 2

    Returns:
        adjudications that match request filtering passed in
    """
    adjudications_filter = request.args.to_dict()
    adjudications = adjudication_service.get_adjudications(adjudications_filter)

    performance_to_adjudication = {}
    for adjudication in adjudications:
        performance_id = adjudication['performance_id']
        if performance_id not in performance_to_adjudication:
            performance_to_adjudication[performance_id] = [adjudication]
        performance_to_adjudication[performance_id].append(adjudication)

    return jsonify(performance_to_adjudication), 200

@blueprint.route('/', methods=['POST'])
def create_adjudication():
    """Creates an adjudication
    TODO: Frontend currently does not send in data about special_award
    Request Body:
        artistic_mark = integer
        audio_url = string
        cumulative_mark = integer
        notes = string
        technical_mark = integer
        performance_id = integer -> associates the adjudication with a performance

    Returns:
        data for created performance
    """
    try:
        body = AdjudicationResource(**request.get_json())

    except Exception as error:
        error = {'error': str(error)}

        return jsonify(error), 400

    return jsonify(adjudication_service.create_adjudication(body.__dict__)), 201

@blueprint.route('/<int:id>', methods=['PUT'])
def update_adjudication(id):
    """Updates an adjudication with provided id

    TODO: Frontend currently does not data about special_award
    Request Body:
        artistic_mark = integer
        audio_url = string
        cumulative_mark = integer
        notes = string
        technical_mark = integer
        performance_id = integer

    Returns:
        updated adjudication
    """
    try:
        body = AdjudicationResource(**request.get_json())
    except Exception as error:
        error = {'error': str(error)}
        return jsonify(error), 400

    update_adjudication = adjudication_service.update_adjudication(id, body.__dict__)

    if update_adjudication is None:
        error = {'error': 'Adjudication not found'}
        return jsonify(error), 404
    
    return jsonify(update_adjudication), 200