from flask import Blueprint
from flask import jsonify, request

from db.models import Adjudication
from db import db

blueprint = Blueprint('adjudication', __name__, url_prefix='/api/adjudications')


@blueprint.route('/<adjudication_id>', methods=['POST'])
def update_adjudication(adjudication_id):
    adjudication = Adjudication.get(adjudication_id)
    adjudication_json = request.get_json()
    adjudication.update(**adjudication_json)

    return jsonify(adjudication.to_dict())

@blueprint.route('/', methods=['POST'])
def create_adjudication():
    adjudication_json = request.get_json()
    new_adjudication = Adjudication.create(**adjudication_json)

    return jsonify(new_adjudication.to_dict())

@blueprint.route('/<performance_id>/test2')    
def test2_route(performance_id):
    artist_marks = []
    technical_marks = []
    adjudication_filter = request.args.to_dict()
    for adjudication in db.session.query(Adjudication).filter(Adjudication.performance_id==performance_id):
        artist_marks.append(adjudication.artistic_mark)
        technical_marks.append(adjudication.technical_mark)

    artistic_mark = sum(artist_marks)/len(artist_marks)
    technical_mark = sum(technical_marks)/len(technical_marks)

    return jsonify(artistic_mark)