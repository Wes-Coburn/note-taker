import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ROUTES from './routes';
import Heading from '../features/Heading';
import Loading from '../features/Loading';
import Error from '../features/Error';

const Header = lazy(() => import('../features/Header'));
const Main = lazy(() => import('../features/Main'));
const Footer = lazy(() => import('../features/Footer'));

const suspend = (element: JSX.Element) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

export function AppContent() {
  return (
    <ErrorBoundary fallback={<Error />}>
      {suspend(<Header />)}
      {suspend(<Main />)}
      {suspend(<Footer />)}
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
