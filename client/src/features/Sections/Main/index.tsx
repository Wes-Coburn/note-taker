import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from '../../../app/routes';
import Login from '../../User/Login';
import Signup from '../../User/Register';
import { useAppSelector } from '../../../app/hooks';
import { selectAuthToken } from '../../User/userSlice';

const Notes = lazy(() => import('../../Notes'));
const NotFound = lazy(() => import('../../Utilities/NotFound'));

export default function Main() {
  const authToken = useAppSelector(selectAuthToken);

  return (
    <main role="main" className="min-h-dvh text-center">
      <Routes>
        <Route
          path={ROUTES.ROOT()}
          element={
            authToken ? <Notes /> : <Navigate to={ROUTES.login()} replace />
          }
        />
        <Route path={ROUTES.login()} element={<Login />} />
        <Route path={ROUTES.signup()} element={<Signup />} />
        <Route path={ROUTES.NOT_FOUND()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
