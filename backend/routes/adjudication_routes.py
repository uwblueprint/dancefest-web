from flask import Blueprint, jsonify, request

from db.models import Adjudication, Performance
from db import db

blueprint = Blueprint('adjudication', __name__, url_prefix='/api/adjudications')


@blueprint.route('/<adjudication_id>', methods=['POST'])
def update_adjudication(adjudication_id):
    adjudication = Adjudication.get(adjudication_id)
    adjudication_json = request.get_json()
    adjudication.update(**adjudication_json)

    return jsonify(adjudication.to_dict())

@blueprint.route('/', methods=['POST'])
def create_adjudication():
    adjudication_json = request.get_json()
    new_adjudication = Adjudication.create(**adjudication_json)

    return jsonify(new_adjudication.to_dict())

@blueprint.route('/<performance_id>/surfaceScores')    
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

@blueprint.route('/<event_id>/<tablet_id>', methods=['GET'])
def get_unjudged_performance(event_id, tablet_id):
    #1. Get all performances
    all_performances = Performance.get_by(**{"event_id": event_id})
    for performance in all_performances:
        # 2. Get all adjudications for that performance
        # 3. Check if any of those adjudications have a tablet_id that matches   
        q = db.session.query(Adjudication).filter(Adjudication.tablet_id==tablet_id, Adjudication.performance_id==performance.id)
        # 4. If none match, return that performance
        if (db.session.query(q.exists()).scalar()==False):
            return jsonify(performance.to_dict())
        else: 
            continue
    return jsonify({})

@blueprint.route('/<int:performance_id>/<tablet_id>', methods=['GET'])
def get_adjudication_by_judge(performance_id, tablet_id):
    adjudication = db.session.query(Adjudication).filter(Adjudication.tablet_id==tablet_id, Adjudication.performance_id==performance_id).first()
    return jsonify(adjudication.to_dict())

@blueprint.route('judges/<int:performance_id>', methods=['GET'])
def get_judges_who_adjudicated(performance_id):
    judge_ids = []
    adjudication_filter = request.args.to_dict()
    for adjudication in db.session.query(Adjudication).filter(Adjudication.performance_id==performance_id).distinct(Adjudication.tablet_id):
        judge_ids.append(adjudication.tablet_id)
    return jsonify(judge_ids)  
