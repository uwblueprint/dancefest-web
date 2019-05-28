import os

from flask import Flask

def create_app():
    app = Flask(__name__)

    import routes
    app.register_blueprint(routes.blueprint)

    return app

if __name__ == '__main__':
	app = create_app()
	app.run(host='0.0.0.0', port=5000)