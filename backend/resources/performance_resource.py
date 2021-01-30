import uuid

class PerformanceResource(object):
    def __init__(self, school_id=None, performers=[], dance_title=None, dance_style=None, dance_entry=None, dance_size=None, competition_level=None, choreographers=None, academic_level=None):
        # TODO: add validations for fields
        self.school_id = school_id
        self.performers = performers
        self.dance_title = dance_title
        self.dance_style = dance_style
        self.dance_size = dance_size
        self.competition_level = competition_level
        self.choreographers = choreographers
        self.academic_level = academic_level
        # TODO: why do we need this token?
        self.token = uuid.uuid4().hex


     