from flask import Blueprint
from flask import jsonify

blueprint = Blueprint('event', __name__, url_prefix='/events')

@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'