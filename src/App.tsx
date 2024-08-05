import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
