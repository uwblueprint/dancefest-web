from db.models import School, SchoolContact
from db import db

def get_schools():
    schools = db.session.query(School) \
        .all()
       
    return [school.to_dict(True) for school in schools]

def get_school(id):
    try:
        school = School.query \
            .filter(School.id == id) \
            .one()

        return school.to_dict(True)
    except:
        return None

    