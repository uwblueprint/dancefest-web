from flask import Blueprint

blueprint = Blueprint('api', __name__, url_prefix='/api')

@blueprint.route('/')
def main():
	return 'Welcome to Dancefest Backend!'