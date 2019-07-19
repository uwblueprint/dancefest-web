from flask import Blueprint, render_template

print(__name__)

blueprint = Blueprint('frontend', __name__, template_folder="../frontend/build")


@blueprint.route('/')
def main():
    return render_template('index.html')
