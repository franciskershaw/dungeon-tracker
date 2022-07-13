import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import CampaignPage from './pages/CampaignPage/Campaign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="campaign" element={<CampaignPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
