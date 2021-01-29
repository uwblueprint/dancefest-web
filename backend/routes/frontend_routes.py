from flask import Blueprint, render_template, current_app

blueprint = Blueprint('frontend', __name__, template_folder="../../build")

# TODO: talk to the team about serving React via Flask?
@blueprint.route('/')
def main():
    return "API"
