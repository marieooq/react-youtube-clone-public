import React, { useReducer } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup, waitFor, hook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Watch from './Watch';
import { Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StoreProvider } from '../store/index';
import { createMemoryHistory } from 'history';

const selectedItems = [
  {
    id: {
      videoId: 'selected00',
    },
    snippet: {
      thumbnails: {
        description: 'dummy description',
      },
      title: 'selected title1',
    },
  },
];

const relatedItems = [
  {
    id: {
      videoId: 'selected00',
    },
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://dammyimage1/mqdefault.jpg',
          width: 320,
          height: 180,
        },
      },
      title: 'related title1',
    },
  },
];

const server = setupServer(
  rest.get(
    'https://www.googleapis.com/youtube/v3/videos?v=dummyId',
    (req, res, ctx) => res(ctx.status(200), ctx.json({ selectedItems }))
  ),
  rest.get(
    'https://www.googleapis.com/youtube/v3/search?v=dummyId',
    (req, res, ctx) => res(ctx.status(200), ctx.json({ relatedItems }))
  )
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

describe('Mocking API', () => {
  it('[Fetch success] Should fetch data correctly', async () => {
    const history = createMemoryHistory();
    history.push('/watch?v=dummyId');

    render(
      <StoreProvider>
        <Router history={history}>
          <Watch />
        </Router>
      </StoreProvider>
    );

    // expect(await screen.findByText('selected title1')).toBeInTheDocument();
    // expect(await screen.findByText('related title1')).toBeInTheDocument();
    // expect(await screen.findByText('title2')).toBeInTheDocument();
    // expect(await screen.findByText('title3')).toBeInTheDocument();
  });
});
