import { createRoot } from 'react-dom/client';

import { MainView } from './components/main-view/main-view';

import './index.scss';

const MyBooksApp = () => {
  return <MainView />;
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyBooksApp />);
