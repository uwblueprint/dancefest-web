import os

from flask import Flask

def create_app():
    app = Flask(__name__, static_folder = '../build/static')

    import api_routes, frontend_routes
    app.register_blueprint(api_routes.blueprint)
    app.register_blueprint(frontend_routes.blueprint)

    return app

if __name__ == '__main__':
	app = create_app()
	app.run(host='0.0.0.0', port=5000)