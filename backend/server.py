import os

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_folder = '../build/static')
    CORS(app)

    from .db.init_db import init_db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/dancefest'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app=app)

    from .routes import event_routes, performance_routes, frontend_routes, adjudication_routes

    app.register_blueprint(event_routes.blueprint)
    app.register_blueprint(performance_routes.blueprint)
    app.register_blueprint(frontend_routes.blueprint)
    app.register_blueprint(adjudication_routes.blueprint)

    return app

if __name__ == '__main__':
	app = create_app()
	app.run(host='0.0.0.0', port=5000)
