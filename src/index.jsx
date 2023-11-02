import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';

import './index.scss';

const MyBooksApp = () => {
  return (
    <Provider store={store}>
      <div>
        <Container>
          <MainView />
        </Container>
      </div>
    </Provider>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyBooksApp />);
