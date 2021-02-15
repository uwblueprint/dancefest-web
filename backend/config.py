import os

basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
    """
    Common configurations
    """
    # put any configurations here that are common across all environments
    # list of available configs: https://flask.palletsprojects.com/en/1.1.x/config/
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """
    Development configurations
    """
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    """
    Production configurations
    """
    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}