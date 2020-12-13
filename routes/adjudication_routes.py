from flask import Blueprint
from flask import jsonify, request

from db.models import Adjudication
from db.models import Performance

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
        adjudication_filter = request.args.to_dict()
        # 2. Get all adjudications for that performance
        adjudications = Adjudication.get_by(performance_id=performance.id, **adjudication_filter)
        for adjudication in adjudications:
        # 3. Check if any of those adjudications have a tablet_id that matches   
            q = adjudications.filter(adjudication.tablet_id==tablet_id)
            # 4. If none match, return that performance
            if (q.exists()==False):
                return jsonify(performance.to_dict())
    return jsonify(None)