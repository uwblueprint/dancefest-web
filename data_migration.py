import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from backend.db.models import Event, Performance, Adjudication
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Use a service account
if __name__ == '__main__':
	engine = create_engine(os.getenv('DATABASE_URL'))
	Session = sessionmaker(bind=engine)
	session = Session()
	cred = credentials.Certificate('serviceAccountKey.json')
	firebase_admin.initialize_app(cred)
	firebase_db = firestore.client()
	event = firebase_db.collection(u'events').document('Rva6FuhOSZfF4HGq7Vh2')
	performances = event.collection('performances')
	event = event.get().to_dict()
	event_dict = {
		'event_title': event.get('eventTitle'),
		'num_judges': event.get('numJudges'),
		'event_date': event.get('eventDate')
	}
	eventObj = Event(**event_dict)
	session.add(eventObj)
	session.flush()
	eventId = eventObj.id
	print('Inserted Event with id: %s' % eventObj.id)
	for performance in performances.get():
		pd = performance.get('')
		performance_dict = {
			'academic_level': pd.get('academicLevel'),
			'choreographers': pd.get('choreographers'),
			'competition_level': pd.get('competitionLevel'),
			'dance_entry': pd.get('danceEntry'),
			'dance_style': pd.get('danceStyle'),
			'dance_title': pd.get('danceTitle'),
			'performers': pd.get('performers'),
			'school': pd.get('school'),
			'event_id': eventId, # replace with event.id
		}
		perfObj = Performance(**performance_dict)
		performanceId = perfObj.id
		session.add(perfObj)
		session.flush()
		adjudications = performances.document(performance.id).collection('adjudications')
		print('Inserted Performance with id: %s' % perfObj.id)
		for adjudication in adjudications.get():
			ad = adjudication.get('')
			adjudication_dict = {
				'artistic_mark': ad.get('artisticMark'),
				'audio_url': ad.get('audioURL'),
				'cumulative_mark': ad.get('cumulativeMark'),
				'tablet_id': ad.get('tabletID'),
				'notes': ad.get('notes'),
				'special_award': ad.get('specialAward'),
				'technical_mark': ad.get('technicalMark'),
				'performance_id': performanceId, # replace with performance.id
			}
			adjObj = Adjudication(**adjudication_dict)
			session.add(adjObj)
			session.flush()
			print('Inserted Adjudication with id: %s' % adjObj.id)
		session.commit()
		session.close()
