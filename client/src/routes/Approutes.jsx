import { Routes, Route } from "react-router-dom";
import UserMain from "../pages/UserMain";
import CampaignDetail from "../pages/CampaignDetail";
import ProtectedRoute from "./ProtectedRoute";
import CreateCampaign from "../pages/CreateCampaign";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";


const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC — koi bhi dekh sakta */}
      <Route path="/" element={<UserMain />} />
      <Route path="/campaign/:id" element={<CampaignDetail />} />

      {/* PROTECTED — wallet connect hona chahiye */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 — koi bhi galat URL */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;