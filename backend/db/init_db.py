def _init_postgres_db(app):
    from . import db
    from .seeds import seed
    from .models import Event, Performance, Adjudication

    # See http://flask-sqlalchemy.pocoo.org/latest/contexts/
    app.app_context().push()
    db.init_app(app)

    # Clear database tables
    db.reflect()
    db.drop_all()

    # Init database tables
    db.create_all()

    db.session.commit()

    # Seed database with sample data
    seed()


def init_db(app):
    _init_postgres_db(app)
