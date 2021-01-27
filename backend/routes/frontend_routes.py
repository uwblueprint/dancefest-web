from flask import Blueprint, render_template, current_app

blueprint = Blueprint('frontend', __name__, template_folder="../../build")

@blueprint.route('/')
def main():
    return "API"
