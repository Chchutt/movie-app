import React from 'react';
import { createRoot } from 'react-dom/client';

import Index from './components/App';
import './index.scss';

createRoot(document.getElementById('root')).render(<Index />);
