from db.models import SettingType

class SettingResource(object):
    def __init__(self, setting_type=None, setting_value=None):
        # TODO proper validation when errors are handled nicely
        self.setting_type = SettingType[setting_type]
        self.setting_value = setting_value
     