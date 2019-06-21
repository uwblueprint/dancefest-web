def seed():
    from .models import Event, Performance, Adjudication

    event = Event.create(event_title="test event")

    for i in range(10):
        performance = Performance.create(dance_title='test dance {}'.format(i + 1), event_id=event.id)
        Adjudication.create(performance_id=performance.id)
