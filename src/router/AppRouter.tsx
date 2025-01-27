import { Routes, Route } from "react-router";

import Home from "../pages/Home";
import { AppLayout } from "../layout/AppLayout";

const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tab1" element={<div>Tab1</div>} />
        <Route path="/tab2" element={<div>Tab2</div>} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
