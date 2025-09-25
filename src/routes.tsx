// routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Principal from "./pages/Principal";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      
    </Routes>
  );
};

export default AppRoutes;
