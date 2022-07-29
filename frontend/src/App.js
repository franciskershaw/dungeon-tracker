import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './layout/SharedLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CampaignsHomePage from './pages/CampaignsHomePage/CampaignsHomePage';
import CampaignDashboard from './pages/CampaignDashboard/CampaignDashboard';
import Error from './pages/Error/Error';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="campaigns" element={<CampaignsHomePage />} />
            <Route path="campaigns/:id" element={<CampaignDashboard />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
