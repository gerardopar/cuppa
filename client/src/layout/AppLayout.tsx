import React from "react";

import SideNav from "../components/sidenav/SideNav";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="h-[100vh] flex">
      <SideNav />
      {children}
    </main>
  );
};

export default AppLayout;
