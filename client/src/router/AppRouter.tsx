import { Routes, Route } from "react-router";

import Home from "../pages/home/HomePage";
import AppLayout from "../layout/AppLayout";
import SportsPage from "../pages/sports/SportsPage";
import PoliticsPage from "../pages/politics/PoliticsPage";
import BusinessPage from "../pages/business/BusinessPage";
import TechnologyPage from "../pages/technology/TechnologyPage";
import EntertainmentPage from "../pages/entertainment/EntertainmentPage";
import HealthLifeStylePage from "../pages/healthLifeStyle/HealthLifeStylePage";
import ScienceEnvironmentPage from "../pages/scienceEnvironment/ScienceEnvironmentPage";

const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/politics" element={<PoliticsPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/health-life-style" element={<HealthLifeStylePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route
          path="/science-environment"
          element={<ScienceEnvironmentPage />}
        />
        <Route path="/saved" element={<div>Saved</div>} />
        <Route path="/search" element={<div>Search</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
