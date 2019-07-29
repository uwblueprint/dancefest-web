from flask import Blueprint
from flask import jsonify
from sqlalchemy.sql import label 
from ..db import db
from ..db.models import Award, AwardPerformance

import json

blueprint = Blueprint('award', __name__, url_prefix='/awards')

@blueprint.route('/<event_id>', methods=['GET'])
def get_awards(event_id):
	awards = Award.get_by(event_id=event_id)
	return jsonify({ award.id: award.to_dict() for award in awards })
    
@blueprint.route('/<performance_id>/award_performance', methods=['GET'])
def get_award_performance(performance_id):
    award_performances = db.session.query(Award.title, Award.nominee_count,\
        label('nominees', db.func.count(AwardPerformance.award_id)))\
        .join(AwardPerformance)\
        .filter_by(performance_id=performance_id)\
        .group_by(Award.title, Award.nominee_count).all()

    return jsonify({ title: {'nominee_count': nominee_count, 'count': count} for title, nominee_count, count in award_performances})