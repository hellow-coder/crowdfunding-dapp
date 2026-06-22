import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import UserMain from "../pages/UserMain";
import CampaignDetail from "../pages/CampaignDetail";
import ProtectedRoute from "./ProtectedRoute";
import CreateCampaign from "../pages/CreateCampaign";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* PUBLIC */}
        <Route path="/" element={<UserMain />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;