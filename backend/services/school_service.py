from db.models import School, SchoolContact
from db import db
import logging 
def get_schools():
    schools_data = db.session.query(School, SchoolContact) \
        .outerjoin(SchoolContact, School.id == SchoolContact.school_id) \
        .all()
    
    res = {}
    for school, school_contact in schools_data:
        school_info = school.to_dict()
        if school_contact:
            school_info = {**school_info, **school_contact.to_dict()}
        res[school.id] = school_info
       
    return res

def get_school(id):
    try:
        school, school_contact = db.session.query(School, SchoolContact) \
            .outerjoin(SchoolContact, School.id == SchoolContact.school_id) \
            .filter(School.id == id) \
            .one()
    
        res = school.to_dict()
        if school_contact:
            res.update(school_contact.to_dict())
      
        return res
    except:
        return None

    