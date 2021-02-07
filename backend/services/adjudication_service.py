from db.models import Adjudication
from db import db

def get_adjudication(id):
    adjudication = Adjudication.query.get(id)
    return adjudication and adjudication.to_dict()

def get_adjudications(adjudication_filter=None):

    adjudications = Adjudication.query
        
    if 'performance_id' in adjudication_filter:
        performance_ids = adjudication_filter['performance_id'].split(',')
        adjudications = adjudications.filter(Adjudication.performance_id.in_(performance_ids))
    
    return [adjudication.to_dict() for adjudication in adjudications]

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