import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/loginform';
import SignupForm from './components/session/SignupForm';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import './reset.css'

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
        element: <h1>Welcome!</h1>
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "signup",
        element: <SignupForm />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
