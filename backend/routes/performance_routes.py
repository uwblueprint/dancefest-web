from flask import Blueprint
from flask import jsonify

blueprint = Blueprint('performance', __name__, url_prefix='/performances')

@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'