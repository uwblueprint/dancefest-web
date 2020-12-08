def seed():
    from db.models import SchoolContact, School, Event, Performance, Adjudication, Award, AwardPerformance, NominationComment, Tablet, UserTypes, User
    import random, uuid

    event = Event.create(
        event_title='F20 Test Event',
        num_judges=3,
    )

    awards = ['Creative Concept', 'Impressive Focus', 'Unique Adaptation']
    for award in awards:
        Award.create(title=award, event_id=event.id, nominee_count=0)

    names = ['Brandon L', 'Victoria L', 'Mark A', 'Winnie R', 'Samu B', 'Megan N', 'Stephen Y', 'Leon O', 'Peiyao C', 'Lena N', 'Jason F', 'Leon L', 'Nim W', 'Imran A', 'Aaron Y', 'Anson Y', 'Chidi N', 'Mathurah R', 'Howard Y', 'Sophie Q']
    adjectives = ['great', 'good', 'okay', 'bad', 'boring']
    academic_levels = ['Elementary', 'Secondary']
    comp_levels = ['Competitive 1', 'Competitive 2', 'Novice', 'Pre-Competitive 1', 'Pre-Competitive 2']
    dance_sizes = ['Duet', 'Grad Solo', 'Large Group 16 +', 'Medium Group 10-15', 'Production', 'Small Group 4-9', 'Trio']
    dance_styles = ['Ballet', 'Creative Collab', 'Cultural', 'Fusion', 'Hip Hop', 'Jazz', 'Lyrical', 'Modern/Contemporary', 'Musical Theatre - Lip Sync', 'Musical Theatre - Vocals', 'Open', 'Production', 'Tap']
    schools = [
        'BCI - Bluevale CI', 'CAS - Central Algoma S.S.', 'CCC - Cardinal Carter Catholic',
        'CCCE - Cardinal Carter Middle School', 'CCH - Catholic Central H.S.', 'CHC - Cameron Heights CI',
        'CKS - Chatham Kent S.S.', 'ECI - Eastwood CI', 'FHC - Forest Heights CI', 'GAH - General Amherst H.S.',
        'HNH - Holy Name H.S.', 'LADE - L.A. Desmarais Catholic School', 'LAJ - E.J. Lajeunesse',
        'MAC - Sir John A. MacDonald S.S.', 'STA - St. Anne Catholic H.S.', "STJ - St. Joseph's Catholic S.S.",
        'STV - St. Thomas of Villanova S.S.', 'TVA - Tecumseh Vista Academy', 'WAP - SATEC @ W.A. Porter CI', 'WCI - Walkerville CI'
    ]
    teacher_names = ['Brandon L', 'Victoria L', 'Mark A', 'Winnie R', 'Samu B', 'Megan N', 'Stephen Y', 'Leon O', 'Peiyao C', 'Lena N', 'Jason F', 'Leon L', 'Nim W', 'Imran A', 'Aaron Y', 'Anson Y', 'Chidi N', 'Mathurah R', 'Howard Y', 'Sophie Q']
    teacher_emails = ['csmieton0@wikimedia.org', 'nmenis1@amazon.co.jp', 'rrupprecht2@springer.com', 'mparriss3@admin.ch', 'thucquart4@about.me', 'lrubenczyk5@ebay.co.uk', 'clyal6@ft.com', 'joleksinski7@yellowpages.com', 'gcapponeer8@marriott.com']
    user_types = ['admin', 'dancefest', 'judges', 'blueprint']
    users_emails = ['ansonyu24@gmail.com', 'brandonleung@uwblueprint.org', 'chidinmaumenwofornweze@uwblueprint.org', 'mathurahravigulan@uwblueprint.org']
    user_tokens = ['6wHUzpQAufaqn3qQTZx1P8hlpr03', 'S6WtrYAyMoeb94Xt2oSDPqZbeJr1', 'Ui0lvLZ8RfhWbF4D2r9SROVQQw42', 'kOhrsCjn8BQCM21ij82Dvq6h7n83']

    for user_type in user_types:
        UserTypes.create(
            role=user_type
        )

    for i, user in enumerate(users_emails):
        User.create(
            name=user,
            email=user,
            uid=user_tokens[i],
            user_type=4
        )

    for school in schools:
        School.create(
            name=school,
            phone=random.randint(6471111111,6479999999),
            address=random.choice(schools),
            district=random.choice(schools),
        )

    for i in range(5):
        SchoolContact.create(
            school_id=random.randint(1,20),
            year=random.randint(2019,2020),
            teacher_name=random.choice(teacher_names),
            teacher_email=random.choice(teacher_emails),
            teacher_phone=random.randint(6471111111,6479999999),
            token=uuid.uuid4().hex,

        )

    tablet = Tablet.create(serial='serial{}'.format(1))

    for i in range(10):
        performance = Performance.create(
            dance_title='test dance {}'.format(i + 1),
            event_id=event.id,
            academic_level=random.choice(academic_levels),
            choreographers=random.choices(names, k=2),
            competition_level=random.choice(comp_levels),
            dance_size=random.choice(dance_sizes),
            dance_entry=i+1,
            dance_style=random.choice(dance_styles),
            performers=random.choices(names, k=5),
            school_id=random.randint(1,5),
            token=uuid.uuid4().hex
        )
        
        for i in range(3):
            art = random.randint(50,100)
            tech = random.randint(50,100)
            adjudication = Adjudication.create(
                performance_id=performance.id,
                artistic_mark=art,
                technical_mark=tech,
                cumulative_mark=(art+tech)/2,
                notes='This dance was {}!'.format(random.choice(adjectives)),
                tablet_id=tablet.id
            )
            # TODO: AWARDS SEEDING
            # AwardPerformance.create(
            #     performance_id=performance.id,
            #     award_id=1,
            # )
            # if i % 2 != 0:
            #     NominationComment.create(adjudication_id=adjudication.id, award_id=1,
            #                              comment='This dance was great!')
