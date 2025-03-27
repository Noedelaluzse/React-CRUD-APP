import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage';
import { DashboardRoutes } from '../dashboard/routes/DashboardRoutes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {

  const { status } =  useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
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
