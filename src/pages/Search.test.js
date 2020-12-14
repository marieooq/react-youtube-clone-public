import React, { useReducer } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup, waitFor, hook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StoreProvider } from '../store/index';
import { createMemoryHistory } from 'history';

const items = [
  {
    id: {
      videoId: 'serched00',
    },
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://dammyimage1/mqdefault.jpg',
          width: 320,
          height: 180,
        },
      },
      title: 'title1',
    },
  },
  {
    id: {
      videoId: 'serched01',
    },
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://dammyimage1/mqdefault.jpg',
          width: 320,
          height: 180,
        },
      },
      title: 'title2',
    },
  },
  {
    id: {
      videoId: 'serched02',
    },
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://dammyimage1/mqdefault.jpg',
          width: 320,
          height: 180,
        },
      },
      title: 'title3',
    },
  },
];

const server = setupServer(
  rest.get(
    'https://www.googleapis.com/youtube/v3/search?query=dummy',
    (req, res, ctx) => res(ctx.status(200), ctx.json({ items }))
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
    history.push('/search?query=dummy');

    render(
      <StoreProvider>
        <Router history={history}>
          <Search />
        </Router>
      </StoreProvider>
    );

    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(await screen.findByText('title2')).toBeInTheDocument();
    expect(await screen.findByText('title3')).toBeInTheDocument();
  });
});
