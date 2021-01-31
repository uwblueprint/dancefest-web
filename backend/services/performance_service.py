from db.models import Performance
from db import db

def get_performance(id):
    performance = Performance.query.get(id)
    return performance and performance.to_dict()

def create_performance(performance):
    new_performance = Performance(**performance)
    db.session.add(new_performance)
    db.session.commit()
    return new_performance.to_dict()

def update_performance(id, performance):
    Performance.query.filter_by(id=id).update(performance)
    updated_performance = Performance.query.get(id)
    db.session.commit()
    return updated_performance and updated_performance.to_dict()