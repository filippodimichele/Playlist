import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import NewSongPage from './pages/NewSongPage'
import SongPage from './pages/SongPage'
import MainLayout from './layouts/MainLayout'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
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
        element: <SongPage />
      }
    ]
  }
])

// entry point dell'app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)