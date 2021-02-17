import uuid

from flask import Blueprint, jsonify, request

from db.models import Setting

from resources.setting_resource import SettingResource
from services import setting_service

blueprint = Blueprint('setting', __name__, url_prefix='/api/settings')

@blueprint.route('<int:id>', methods=['GET'])
def get_setting(id):
    """Gets setting by id

    Returns:
        setting with provided id
    """
    setting = setting_service.get_setting(id)
    if setting is None:
        error = {'error': 'Setting not found'}
        return jsonify(error), 404

    return jsonify(setting), 200

@blueprint.route('/', methods=['GET'])
def get_settings():
    """Gets settings for the specified type

    Request Body: 
        setting_type: string

    Returns:
        settings that match type
    """
    try:
        body = request.get_json()

        settings = setting_service.get_settings(body["setting_type"])

        return jsonify(settings), 200
    
    except Exception as error:
        error = {'error': str(error)}

        return jsonify(error), 500

@blueprint.route('/', methods=['POST'])
def create_setting():
    """Creates a Setting

    Request Body:
        setting_type: string
        setting_value: string

    Returns:
        data for created setting
    """
    try:
        body = SettingResource(**request.get_json())

    except Exception as error:
        error = {'error': str(error)}

        return jsonify(error), 400

    return jsonify(setting_service.create_setting(body.__dict__)), 201

@blueprint.route('/<int:id>', methods=['PUT'])
def update_setting(id):
    """Updates a setting with provided id

    Request Body:
        setting_type: string 
        setting_value: string

    Returns:
        updated setting
    """
    try:
        body = SettingResource(**request.get_json())
    except Exception as error:
        error = {'error': str(error)}
        return jsonify(error), 400

    updated_setting = setting_service.update_setting(id, body.__dict__)

    if updated_setting is None:
        error = {'error': 'Performance not found'}
        return jsonify(error), 404
    
    return jsonify(updated_setting), 200
