def seed():
    from .models import Event, Performance, Adjudication, Award, AwardPerformance, NominationComment, Tablet

    event = Event.create(event_title="test event")

    awards = ['Creative Concept', 'Impressive Focus', 'Unique Adaptation']

    for award in awards:
        Award.create(title=award, event_id=event.id, nominee_count=0)

    for i in range(10):
        performance = Performance.create(dance_title='test dance {}'.format(i + 1), event_id=event.id)
        tablet = Tablet.create(serial='serial{}'.format(i + 1))
        for i in range(3):
            adjudication = Adjudication.create(performance_id=performance.id)
            AwardPerformance.create(performance_id=performance.id, award_id=i + 1)
            if i % 2 != 0:
                NominationComment.create(adjudication_id=adjudication.id, award_id=i + 1,
                                         comment="This dance was great!")
