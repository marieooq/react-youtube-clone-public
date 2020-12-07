import React from ' react';
import { render, screen, cleanup } from '@testing-library/react';
import {
  fetchPopularData,
  fetchSelectedData,
  fetchRelatedData,
  fetchSearchData,
} from './index';

import { rest } from 'msw';
import { setupServer } from 'msv';

const baseURL = 'https://www.googleapis.com/youtube/v3';

const params = {
  part: 'snippet',
  maxResults: '40',
  key: KEY,
  regionCode: 'CA',
  type: 'video',
};

const server = setupServer(rest.get(baseURL), (req, res, ctx) => {
  return res(ctx.status(200)), ctx.json({ test: 'dammy' });
});
