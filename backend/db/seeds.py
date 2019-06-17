def seed():
    from . import db
    from .models import Event, Performance, Adjudication

    event = Event(event_title="test event")
    db.session.add(event)
    db.session.commit()

    for i in range(10):
        performance = Performance(dance_title='test dance {}'.format(i+1), event_id=event.id)
        db.session.add(performance)
        db.session.commit()
        adjudication = Adjudication(performance_id=performance.id)
        db.session.add(adjudication)
        db.session.commit()
