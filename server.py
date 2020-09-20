import os

from flask import Flask
from flask_cors import CORS
from flask_mail import Mail

# Routes
from routes import (
    event_routes,
    performance_routes,
    frontend_routes,
    adjudication_routes,
    mailer_routes,
    award_routes,
    tablet_routes,
    school_routes
)

mail = Mail()


def create_app():
    app = Flask(__name__, static_folder='../build/static')

    # Converters
    # from .utils.converters import ListConverter
    # app.url_map.converters['list'] = ListConverter

    # CORS
    # CORS(app)

    # Mail
    # app.config.update(
    #     MAIL_SERVER='smtp.gmail.com',
    #     MAIL_DEFAULT_SENDER=os.environ['EMAIL_USER'],
    #     MAIL_USERNAME=os.environ['EMAIL_USER'],
    #     MAIL_PASSWORD=os.environ['EMAIL_PASSWORD'],
    #     MAIL_USE_TLS=True,
    #     MAIL_PORT=587
    # )
    # mail.init_app(app)

    # DB
    # from .db.init_db import init_db
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # init_db(app=app)

    app.register_blueprint(event_routes.blueprint)
    app.register_blueprint(performance_routes.blueprint)
    app.register_blueprint(frontend_routes.blueprint)
    app.register_blueprint(adjudication_routes.blueprint)
    # app.register_blueprint(mailer_routes.blueprint)
    app.register_blueprint(award_routes.blueprint)
    app.register_blueprint(school_routes.blueprint)
    app.register_blueprint(tablet_routes.blueprint)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
