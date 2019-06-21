from flask import Blueprint

blueprint = Blueprint('performance', __name__, url_prefix='/performances')


@blueprint.route('/')
def main():
    return 'Welcome to Dancefest Backend!'
