import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// afterEach(() => cleanup());

// describe('Header', () => {
//   it('Should render all the elements correctly', () => {
//     render(<Header />);
//     expect(screen.getRoleBy('button')).toBeTruthy();
//   });
// });
