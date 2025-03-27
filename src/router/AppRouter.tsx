import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage';
import { DashboardRoutes } from '../dashboard/routes/DashboardRoutes';

export const AppRouter = () => {

  const status = 'not-authenticated'; // 'authenticated' | 'loading' | 'not-authenticated'

  if (status === 'loading') {
    return <div>Loading...</div>
  }


  return (
    <Routes>
      {
        status === 'not-authenticated' ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<DashboardRoutes />} />
          </>
        )
      }

    </Routes>
  )
}
