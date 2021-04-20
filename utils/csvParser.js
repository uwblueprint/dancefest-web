import { Parser, transforms } from 'json2csv';

// TODO: Figure out what paths need to be unwinded
export const json2csvParser = new Parser({
  transforms: [
    transforms.unwind({ paths: ['schools', 'awards'], blankOut: true }),
    transforms.flatten('__'),
  ],
  fields: [
    { label: 'Entry Title', value: 'dance_title' },
    {
      label: 'Audio Feedback',
      value: row =>
        row.adjudications
          ? row.adjudications
              .map(adjudication => adjudication.audio_url)
              .filter(audioUrl => !!audioUrl)
              .join(', ')
          : null,
    },
    {
      label: 'Performance Level',
      value: 'competition_level',
    },
    {
      label: 'Dance Size',
      value: 'dance_size',
    },
    {
      label: 'Performer(s)',
      value: row => row.performers.join(', '),
    },
    {
      label: 'Choreographer(s)',
      value: row => row.choreographers.join(', '),
    },
    {
      label: 'Artistic Score',
      value: 'artisticScore',
    },
    {
      label: 'Technical Score',
      value: 'technicalScore',
    },
    {
      label: 'Cumulative Score',
      value: 'cumulativeScore',
    },
    {
      label: 'Award(s)',
      value: row =>
        row.awards
          ? row.awards
              .filter(award => award.status === 'FINALIST' && award.type !== 'SPECIAL')
              .map(award => award.title)
              .join(', ')
          : null,
    },
    {
      label: 'Special Award',
      value: row =>
        row.awards
          ? row.awards.filter(award => award.status === 'FINALIZED').map(award => award.title)
          : null,
    },
  ],
});
