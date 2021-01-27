def _init_postgres_db(app):
    from . import db, migrate
    from db.seeds import seed

    # See http://flask-sqlalchemy.pocoo.org/latest/contexts/
    app.app_context().push()
    db.init_app(app)
    migrate.init_app(app, db)

    # Clear database tables
    db.reflect()
    db.drop_all()

    # Init database tables
    db.create_all()

    db.session.commit()

    # TODO: remove when we have real data
    # Seed database with sample data
    seed()


def init_db(app):
    _init_postgres_db(app)
