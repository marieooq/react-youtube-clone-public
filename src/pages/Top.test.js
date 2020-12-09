import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Top from './Top';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const popularVideos = {
  data: {
    items: [
      {
        id: '0',
        snippet: {
          thumbnails: {
            default: {
              url: 'https://dammyimage1/default.jpg',
              width: 120,
              height: 90,
            },
            high: {
              url: 'https://dammyimage1/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            maxres: {
              url: 'https://dammyimage1/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
            medium: {
              url: 'https://dammyimage1/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            standard: {
              url: 'https://dammyimage1/sddefault.jpg',
              width: 640,
              height: 480,
            },
          },
          title: 'title1',
        },
      },
    ],
  },
};

const server = setupServer(
  rest.get('https://www.googleapis.com/youtube/v3/videos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularVideos));
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
      <Router>
        <Top />
      </Router>
    );
    // await screen.debug();
    // await screen.debug(await screen.getByTestId('header'));
    // await screen.debug(await screen.findByText('Vide o Tube'));
    expect(await screen.findByText('title1')).toBeInTheDocument();
    // expect(await screen.findByText('title2')).toBeInTheDocument;
    // expect(await screen.findByText('title3')).toBeInTheDocument;
  });
});
