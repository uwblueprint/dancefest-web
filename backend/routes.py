from flask import Blueprint
from flask import jsonify

blueprint = Blueprint('api', __name__, url_prefix='/api')

@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'