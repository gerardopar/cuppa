import { Routes, Route } from "react-router";

import AppLayout from "../layout/AppLayout";
import Home from "../pages/home/HomePage";

const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved" element={<div>Saved</div>} />
        <Route path="/search" element={<div>Search</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
