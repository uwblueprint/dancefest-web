from flask import Blueprint, jsonify, request

from db.models import Adjudication, Performance
from db import db

from resources.adjudication_resource import AdjudicationResource
from services import adjudication_service

blueprint = Blueprint('adjudication', __name__, url_prefix='/api/adjudications')

@blueprint.route('/', methods=['POST'])
def create_adjudication():
    """Creates an adjudication
    TODO: Frontend currently does not data about special_award
    Request Body:
        artistic_mark = integer
        audio_url = string
        cumulative_mark = integer
        notes = string
        technical_mark = integer
        performance_id = integer

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

#TODO: these scores should be returned when we retrieves the performances
@blueprint.route('/<int:performance_id>/surface_scores')    
def surface_scores_route(performance_id):
    artist_marks = []
    technical_marks = []
    cumulative_marks = []
    adjudication_filter = request.args.to_dict()
    for adjudication in db.session.query(Adjudication).filter(Adjudication.performance_id==performance_id):
        artist_marks.append(adjudication.artistic_mark)
        technical_marks.append(adjudication.technical_mark)
        cumulative_marks.append(adjudication.cumulative_mark)
    
    # Fallback to mark of 0 if the list is empty
    artistic_mark = int(sum(artist_marks)/len(artist_marks)) if artist_marks else 0
    technical_mark = int(sum(technical_marks)/len(technical_marks)) if technical_marks else 0
    cumulative_mark = int(sum(cumulative_marks)/len(cumulative_marks)) if cumulative_marks else 0

    return jsonify(artistic_mark=artistic_mark, technical_mark=technical_mark, cumulative_mark=cumulative_mark)