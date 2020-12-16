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

const searchedItems = [
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
          url: 'https://dammyimage2/mqdefault.jpg',
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
          url: 'https://dammyimage3/mqdefault.jpg',
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
    (req, res, ctx) => res(ctx.status(200), ctx.json({ items: searchedItems }))
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

    //check if the first object in popularItems is displayed correctly.
    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(screen.getByAltText('title1')).toBeTruthy();
    expect(screen.getByAltText('title1')).toHaveAttribute(
      'src',
      'https://dammyimage1/mqdefault.jpg'
    );

    //check if the second object in popularItems is displayed correctly.
    expect(await screen.findByText('title2')).toBeInTheDocument();
    expect(screen.getByAltText('title2')).toBeTruthy();
    expect(screen.getByAltText('title2')).toHaveAttribute(
      'src',
      'https://dammyimage2/mqdefault.jpg'
    );

    //check if the third object in popularItems is displayed correctly.
    expect(await screen.findByText('title3')).toBeInTheDocument();
    expect(screen.getByAltText('title3')).toBeTruthy();
    expect(screen.getByAltText('title3')).toHaveAttribute(
      'src',
      'https://dammyimage3/mqdefault.jpg'
    );
  });
});
