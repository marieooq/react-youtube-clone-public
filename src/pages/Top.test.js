import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import Top from './Top';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StoreProvider } from '../store/index';

const popularItems = [
  {
    id: '0',
    snippet: {
      thumbnails: {
        default: {
          url: 'https://dammyimage1/default.jpg',
          width: 120,
          height: 90,
        },
      },
      title: 'title1',
    },
  },
  {
    id: '1',
    snippet: {
      thumbnails: {
        default: {
          url: 'https://dammyimage2/default.jpg',
          width: 120,
          height: 90,
        },
      },
      title: 'title2',
    },
  },
  {
    id: '2',
    snippet: {
      thumbnails: {
        default: {
          url: 'https://dammyimage3/default.jpg',
          width: 120,
          height: 90,
        },
      },
      title: 'title3',
    },
  },
];
const server = setupServer(
  rest.get('https://www.googleapis.com/youtube/v3/videos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ items: popularItems }));
  })
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
    render(
      <StoreProvider>
        <Router>
          <Top />
        </Router>
      </StoreProvider>
    );

    //check if the first object in popularItems is displayed correctly.
    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(screen.getByAltText('title1')).toBeTruthy();
    expect(screen.getByAltText('title1')).toHaveAttribute(
      'src',
      'https://dammyimage1/default.jpg'
    );

    //check if the second object in popularItems is displayed correctly.
    expect(await screen.findByText('title2')).toBeInTheDocument();
    expect(screen.getByAltText('title2')).toBeTruthy();
    expect(screen.getByAltText('title2')).toHaveAttribute(
      'src',
      'https://dammyimage2/default.jpg'
    );

    //check if the third object in popularItems is displayed correctly.
    expect(await screen.findByText('title3')).toBeInTheDocument();
    expect(screen.getByAltText('title3')).toBeTruthy();
    expect(screen.getByAltText('title3')).toHaveAttribute(
      'src',
      'https://dammyimage3/default.jpg'
    );
  });
});
