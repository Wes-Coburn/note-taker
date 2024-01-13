import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import ROUTES from './routes';
import Heading from '../features/Sections/Heading';
import Header from '../features/Sections/Header';
import Main from '../features/Sections/Main';
import Footer from '../features/Sections/Footer';
import Error from '../features/Utilities/Error';

export function AppContent() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundary>
  );
}

/** HelmetProvider is here instead of main.tsx to avoid testing errors */
function App() {
  return (
    <HelmetProvider>
      <Router>
        <Heading pageURL={ROUTES.ROOT()} />
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
