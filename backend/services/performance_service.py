from db.models import Performance, School
from db import db

def get_performance(id):
    performance = Performance.query.get(id)
    return performance and performance.to_dict()

def get_performances(performance_filter=None):
    """
    Returns performances with associated event_id. If no event_id is passed in,
    all performances are returned

    Returns:
        performances
    """
    performances = db.session.query(Performance)

    print(performance_filter)
    if 'event_id' in performance_filter:
        performances = performances.filter(Performance.event_id == performance_filter['event_id'])

    if 'school_id' in performance_filter:
        performances = performances.filter(Performance.school_id.in_(performance_filter['school_id']))


    return [performance.to_dict(True) for performance in performances]

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