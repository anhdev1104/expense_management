import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
