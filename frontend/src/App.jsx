import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/loginform';
import SignupForm from './components/session/SignupForm';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import TrailsIndex from './components/Trails/TrailsIndex';
import './reset.css'
import TrailShow from './components/Trails/Trailshow';
import RealTrailsIndex from './components/Trails/RealTrailsIndex';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TrailsIndex/>
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "signup",
        element: <SignupForm />
      },
      {
        path: "trails/:trailId",
        element: <TrailShow/>
      },
      {
        path: "trails",
        element: <RealTrailsIndex/>
      },

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
