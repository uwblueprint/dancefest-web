import dateutil.parser
from flask import Blueprint
from flask import jsonify
from flask import request

from db import db
from db.models import Event, Performance, Adjudication

blueprint = Blueprint('events', __name__, url_prefix='/api/events')


@blueprint.route('/<event_id>', methods=['POST'])
def update_event(event_id):
    event = Event.query.get(event_id)

    event_json = request.get_json()
    event_json['event_date'] = dateutil.parser.parse(event_json['event_date'])

    event.update(**event_json)

    return jsonify(event.to_dict())


@blueprint.route('/', methods=['POST'])
def create_event():
    event_json = request.get_json()

    event_json['event_date'] = dateutil.parser.parse(event_json['event_date'])
    new_event = Event.create(**event_json)

    return jsonify(new_event.to_dict())


@blueprint.route('/')
def get_events():
    events = Event.query.all()
    return jsonify({event.id: event.to_dict() for event in events})


# TODO: re-org where the endpoints go especially this one and update api specs
@blueprint.route('/<event_id>/performances')
def get_performances(event_id):
    events = Event.query.all()
    all_performances = Performance.get_by(**{"event_id": event_id})
    return jsonify({performance.id: performance.to_dict() for performance in all_performances})

@blueprint.route('/<event_id>/test')
def test_route(event_id):
    # get all the performances
    all_performances = Performance.get_by(**{"event_id": event_id})
    # get all the adjudications in the peformance, and check if they match the performance
    for performance in all_performances:
        q = db.session.query(Adjudication).filter(Adjudication.performance_id == performance.id)

        if (db.session.query(q.exists()).scalar()==False):
            return jsonify(performance.to_dict())
        else: 
            continue
    return jsonify({})
    # join(Adjudication, Performance.id == Adjudication.performance_id).group_by(Performance.id)
    # return jsonify({b.id: b for b in a})

'''
@blueprint.route('/<int:performance_id>/award_performance', methods=['GET'])
def get_award_performance(performance_id):
    # get the title, number of judges that have nominated a performance for an award,
    # and the number of nominees for a performance's awards
    award_performances = db.session.query(Award.title, Award.nominee_count, Award.id,
                                          db.func.count(AwardPerformance.award_id)) \
        .join(AwardPerformance) \
        .filter_by(performance_id=performance_id) \
        .group_by(Award.title, Award.nominee_count, Award.id).all()

    return jsonify({award_id: {'title': title, 'nominations_count': count, 'nominee_count': nominee_count} for
                    title, nominee_count, award_id, count in award_performances})
'''