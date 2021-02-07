from db.models import Adjudication
from db import db

def create_adjudication(adjudication):
    new_adjudication = Adjudication(**adjudication)
    db.session.add(new_adjudication)
    db.session.commit()
    # TODO: Old code seem to grab the relationships of adjudication but why?
    # If it is not needed, we can remove passing in True 
    return new_adjudication.to_dict(True, 'performance')

def update_adjudication(id, adjudication):
    Adjudication.query.filter_by(id=id).update(adjudication)
    updated_adjudication = Adjudication.query.get(id)
    db.session.commit()
    return updated_adjudication and updated_adjudication.to_dict(True, 'performance')