import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Top from './Top';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://www.googleapis.com/youtube/v3/videos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'dummy' }));
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
    expect(await screen.get);
    // screen.debug(screen.getBy);
  });
});
