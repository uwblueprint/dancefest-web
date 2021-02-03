from flask import Blueprint, jsonify

from db.models import Tablet

blueprint = Blueprint('tablet', __name__, url_prefix='/api/tablets')

# TODO: get rid of tablet routes
@blueprint.route('/<string:tablet_serial>', methods=['GET'])
def get_tablet_by_serial(tablet_serial):
    tablet = Tablet.get_by(serial=tablet_serial, first=True)
    if tablet is None:
        tablet = Tablet.create(serial=tablet_serial)

    return jsonify(tablet.to_dict())
