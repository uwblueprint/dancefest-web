from flask import Blueprint
from flask import jsonify, request

from sqlalchemy.sql import label 

from ..db import db
from ..db.models import Award, AwardPerformance

blueprint = Blueprint('award', __name__, url_prefix='/awards')

@blueprint.route('/<int:event_id>', methods=['GET'])
def get_awards(event_id):
	awards = Award.get_by(event_id=event_id)
	return jsonify({ award.id: award.to_dict() for award in awards })
    
@blueprint.route('/<int:performance_id>/award_performance', methods=['GET'])
def get_award_performance(performance_id):
    award_performances = db.session.query(Award.title, Award.nominee_count,\
        label('nominations_count', db.func.count(AwardPerformance.award_id)))\
        .join(AwardPerformance)\
        .filter_by(performance_id=performance_id)\
        .group_by(Award.title, Award.nominee_count).all()

    return jsonify({ title: {'nominations_count': count, 'nominee_count': nominee_count} for title, nominee_count, count in award_performances})

@blueprint.route('/<int:award_id>', methods=['POST'])
def update_winning_performance(award_id):
    award_json = request.get_json()
    award = Award.get(award_id)
    new_award = award.update(**award_json)
    return jsonify(new_award.to_dict())