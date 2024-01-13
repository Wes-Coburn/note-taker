import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from '../../../app/routes';
import { useAppSelector } from '../../../app/hooks';
import { selectAuthToken } from '../../User/userSlice';
import Login from '../../User/Login';
import Signup from '../../User/Register';
import Notes from '../../Notes';
import NotFound from '../../Utilities/NotFound';

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
