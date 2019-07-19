from flask import Blueprint
from flask import jsonify
from ..db.models import Award

blueprint = Blueprint('award', __name__, url_prefix='/awards')

@blueprint.route('/<event_id>', methods=['GET'])
def get_awards(event_id):
	awards = Award.get_by(event_id=event_id)
	return jsonify({ award.id: award.to_dict() for award in awards })