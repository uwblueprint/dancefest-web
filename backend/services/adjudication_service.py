from db.models import Adjudication
from db import db

def create_adjudication(adjudication):
    new_adjudication = Adjudication(**adjudication)
    db.session.add(new_adjudication)
    db.session.commit()

    return new_adjudication.to_dict()

def update_adjudication(id, adjudication):
    Adjudication.query.filter_by(id=id).update(adjudication)
    update_adjudication = Adjudication.query.get(id)
    db.session.commit()

    if update_adjudication is None:
        return update_adjudication
    return update_adjudication.to_dict()