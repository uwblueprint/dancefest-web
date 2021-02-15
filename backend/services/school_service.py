from db.models import School
from db import db

def get_schools():
    return [result.to_dict() for result in School.query.all()]

def get_school(id):
    school = School.query.get(id)
    return school and school.to_dict()