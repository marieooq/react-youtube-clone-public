import { setupServer } from 'msw/node';
import { handlers } from './handlers';

console.log(...handlers);
export const server = setupServer(...handlers);
