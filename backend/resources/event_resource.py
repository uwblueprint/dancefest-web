import dateutil.parser

class EventResource(object):
    def __init__(self, event_title=None, num_judges=None, event_date=None):
        #TODO: add validations
        self.event_title = event_title
        self.num_judges = num_judges
        self.event_date = dateutil.parser.parse(event_date)


     