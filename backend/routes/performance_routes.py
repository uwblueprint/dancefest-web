from flask import Blueprint
from flask import jsonify
from flask import request

from ..db.models import Performance

blueprint = Blueprint('performance', __name__, url_prefix='/events')


@blueprint.route('/<event_id>/performances', methods=['POST'])
def create_performance(event_id):
	performance_json = request.get_json()
	new_performance = Performance.create(**performance_json)
	return jsonify(new_performance.to_dict())
