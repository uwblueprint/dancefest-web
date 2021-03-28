import { Parser, transforms } from 'json2csv';

// TODO: Figure out what paths need to be unwinded
export const json2csvParser = new Parser({
  transforms: [
    transforms.unwind({ paths: ['schools', 'awards'], blankOut: true }),
    transforms.flatten('__'),
  ],
});
