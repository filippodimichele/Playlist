import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import NewSongPage from './pages/NewSongPage'
import Editpage from './pages/EditPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/song/new',
    element: <NewSongPage />
  },
  {
    path: '/song/:id',
    element: <Editpage />
  }
])

// entry point dell'app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)