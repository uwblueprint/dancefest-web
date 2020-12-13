from flask import Blueprint
from flask import jsonify, request

from db.models import Adjudication
from db.models import Performance
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
    return jsonify(None)