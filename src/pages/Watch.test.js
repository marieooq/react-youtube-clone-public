import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import Watch from './Watch';
import { Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StoreProvider } from '../store/index';
import { createMemoryHistory } from 'history';

const selectedItems = [
  {
    id: 'selected00',
    snippet: {
      title: 'selected title1',
      description: 'dummy description1',
    },
  },
];

const relatedItems = [
  {
    id: {
      videoId: 'related00',
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
    (req, res, ctx) => res(ctx.status(200), ctx.json({ items: selectedItems }))
  ),
  rest.get(
    'https://www.googleapis.com/youtube/v3/search?v=dummyId',
    (req, res, ctx) => res(ctx.status(200), ctx.json({ items: relatedItems }))
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

    //check if the VideoDetail component inside the Watch component is displayed correctly.

    expect(await screen.findByText('selected title1')).toBeInTheDocument();
    expect(await screen.findByText('dummy description1')).toBeInTheDocument();

    //check if the SideList component inside the Watch component is displayed correctly.
    expect(screen.getByAltText('related title1')).toBeTruthy();
    expect(screen.getByAltText('related title1')).toHaveAttribute(
      'src',
      'https://dammyimage1/mqdefault.jpg'
    );
    expect(await screen.findByText('related title1')).toBeInTheDocument();
  });
});
