import { rest } from 'msw';

const baseURL = 'https://www.googleapis.com/youtube/v3';

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const commonParams = {
  part: 'snippet',
  maxResults: '40',
  key: KEY,
  regionCode: 'CA',
  type: 'video',
};

export const handlers = [
  rest.get(`${baseURL}/videos`, (req, res, ctx) => {
    const params = {
      ...commonParams,
      chart: 'mostPopular',
    };
    return res(ctx.status(200), ctx.json({ params, test: 'dummy' }));
  }),
];
