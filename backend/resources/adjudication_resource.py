class AdjudicationResource(object):
    #TODO: currently frontend does not pass data about special awards, should add later
    def __init__(self, performance_id=None, artistic_mark=None, technical_mark=None, cumulative_mark=None, audio_url=None, notes=None):
        #TODO: add validations
        self.performance_id = performance_id
        self.artistic_mark = artistic_mark
        self.technical_mark = technical_mark
        self.cumulative_mark = cumulative_mark
        self.audio_url = audio_url
        self.notes = notes

