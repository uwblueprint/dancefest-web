from db.models import Performance, School
from db import db

def get_performance(id):
    performance = Performance.query.get(id)
    return performance and performance.to_dict()

# TODO: debug
def get_performances(performance_filter=None):
    """
    Returns performances with associated event_id. If no event_id is passed in,
    all performances are returned

    Returns:
        performances
    """
    performances = db.session.query(Performance, School.name) \
        .outerjoin(School, Performance.school_id == School.id) 
        
    if 'event_id' in performance_filter:
        performances = performances.filter(Performance.event_id == performance_filter['event_id'])
    
    # TODO: make this cleaner for getting performance, adjudications for the performance, and school name of the performance
    return {performance.id: {'performance': performance.to_dict(True), 'school_name': school_name} for performance, school_name in performances}

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