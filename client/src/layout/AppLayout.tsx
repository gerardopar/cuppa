import React from "react";

import SideNav from "../components/sidenav/SideNav";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="h-screen flex w-full">
      <div className="w-[120px] h-screen flex-shrink-0">
        <SideNav />
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
};

export default AppLayout;
