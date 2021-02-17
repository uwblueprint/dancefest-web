from db.models import Setting
from db import db

def get_setting(id):
    """
    Returns a particular setting by id
    """
    setting  = Setting.query.get(id)
    return setting and setting.to_dict()

def get_settings(setting_type=None):
    """
    Returns settings with associated type. If no type is passed in,
    all settings are returned

    Returns:
        settings
    """
    if setting_type == None:
        return [result.to_dict() for result in Setting.query.all()]
    else:
        return [result.to_dict() for result in Setting.query.filter_by(setting_type=setting_type)]

def create_setting(setting):
    """
    Creates a new setting
    """
    new_setting = Setting(**setting)
    db.session.add(new_setting)
    db.session.commit()
    return new_setting.to_dict()

def update_setting(id, setting):
    """
    Updates existing setting
    """
    Setting.query.filter_by(id=id).update(setting)
    updated_setting = Setting.query.get(id)
    db.session.commit()
    return updated_setting and updated_setting.to_dict()