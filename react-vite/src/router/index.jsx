import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import { BooksById, BooksByGenre, CreateBook, EditBook } from '../components/Books/index';
import ProfilePage from '../components/ProfilePage/ProfilePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: '/books/create',
        element: <CreateBook />
      },
      {
        path: '/books/:bookId',
        element: <BooksById />
      },
      {
        path: '/books/genre/:genre',
        element: <BooksByGenre />
      },
      {
        path: '/users/:userId',
        element: <ProfilePage />
      },
      {
        path: '/books/:bookId/edit',
        element: <EditBook />
      },
    ],
  },
]);