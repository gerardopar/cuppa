import { Routes, Route } from "react-router";

import Home from "../pages/home/HomePage";
import AppLayout from "../layout/AppLayout";
import SportsPage from "../pages/sports/SportsPage";
import PoliticsPage from "../pages/politics/PoliticsPage";

const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/politics" element={<PoliticsPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/saved" element={<div>Saved</div>} />
        <Route path="/search" element={<div>Search</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
