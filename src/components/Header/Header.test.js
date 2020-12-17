import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => cleanup());

describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('item1')).toBeTruthy();
    expect(screen.getByRole('link')).toBeTruthy();
    expect(screen.getByTestId('item2')).toBeTruthy();
    expect(screen.getByTestId('form')).toBeTruthy();
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});

describe('Input from onChange event', () => {
  it('Should update input value correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const inputValue = screen.getByPlaceholderText('Search');
    userEvent.type(inputValue, 'test keyword');
    expect(inputValue.value).toBe('test keyword');
  });
});
