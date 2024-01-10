import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from '../../app/routes';
import NewNote from '../Notes/NewNote';

const NotesList = lazy(() => import('../Notes/NoteList'));
const NotFound = lazy(() => import('../NotFound'));

function MainContent() {
  return (
    <div>
      <NewNote />
      <NotesList />
    </div>
  );
}

export default function Main() {
  return (
    <main role="main" className="min-h-dvh py-6 text-center">
      <Routes>
        <Route path={ROUTES.ROOT()} element={<MainContent />} />
        <Route path={ROUTES.NOT_FOUND()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
