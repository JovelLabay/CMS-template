// REACT
import { createContext } from 'react';

// GLOBAL CONTEXT PROVIDER
const globalContextStore = createContext<null | string>(null);

export { globalContextStore };
