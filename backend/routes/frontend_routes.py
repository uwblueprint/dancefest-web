from flask import Blueprint, render_template
from flask import jsonify

print(__name__)

blueprint = Blueprint('frontend', __name__, template_folder="../build")

@blueprint.route('/')
def main():
	return render_template('index.html')