import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from db.models import Event, Performance, Adjudication

# Use a service account
def migrateData():
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
	eventObj = Event.create(**event_dict)
	print('Inserted Event with id: %s' % eventObj.id)
	# event = Event.create(**event_dict)
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
			'event_id': eventObj.id, # replace with event.id
		}
		perfObj = Performance.create(**performance_dict)
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
				'performance_id': perfObj.id, # replace with performance.id
			}
			adjObj = Adjudication.create(**adjudication_dict)
			print('Inserted Adjudication with id: %s' % adjObj.id)