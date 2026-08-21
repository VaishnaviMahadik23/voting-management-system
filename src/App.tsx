import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";

import SplashPage from "./pages/auth/SplashPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ElectionsPage from "./pages/admin/ElectionsPage";
import CreateElectionPage from "./pages/admin/CreateElectionPage";
import ElectionDetailPage from "./pages/admin/ElectionDetailPage";
import CandidatesPage from "./pages/admin/CandidatesPage";
import VotersPage from "./pages/admin/VotersPage";
import ResultsPage from "./pages/admin/ResultsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";

import VoterLayout from "./layouts/VoterLayout";
import VoterDashboard from "./pages/voter/VoterDashboard";
import ActiveElectionsPage from "./pages/voter/ActiveElectionsPage";
import ElectionDetailVoterPage from "./pages/voter/ElectionDetailVoterPage";
import VotePage from "./pages/voter/VotePage";
import VoteSubmittedPage from "./pages/voter/VoteSubmittedPage";
import MyVotesPage from "./pages/voter/MyVotesPage";
import VoterResultsPage from "./pages/voter/VoterResultsPage";
import VoterNotificationsPage from "./pages/voter/VoterNotificationsPage";
import VoterProfilePage from "./pages/voter/VoterProfilePage";
import VoterSettingsPage from "./pages/voter/VoterSettingsPage";

function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <SplashPage />;
  return <Navigate to={user.role === "ADMIN" ? "/admin" : "/voter"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Admin */}
            <Route path="/admin" element={<RequireAuth role="ADMIN"><AdminLayout><AdminDashboard /></AdminLayout></RequireAuth>} />
            <Route path="/admin/elections" element={<RequireAuth role="ADMIN"><AdminLayout><ElectionsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/elections/create" element={<RequireAuth role="ADMIN"><AdminLayout><CreateElectionPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/elections/:id" element={<RequireAuth role="ADMIN"><AdminLayout><ElectionDetailPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/candidates" element={<RequireAuth role="ADMIN"><AdminLayout><CandidatesPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/voters" element={<RequireAuth role="ADMIN"><AdminLayout><VotersPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/results" element={<RequireAuth role="ADMIN"><AdminLayout><ResultsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/reports" element={<RequireAuth role="ADMIN"><AdminLayout><ReportsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/notifications" element={<RequireAuth role="ADMIN"><AdminLayout><NotificationsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/audit-logs" element={<RequireAuth role="ADMIN"><AdminLayout><AuditLogsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/settings" element={<RequireAuth role="ADMIN"><AdminLayout><SettingsPage /></AdminLayout></RequireAuth>} />
            <Route path="/admin/profile" element={<RequireAuth role="ADMIN"><AdminLayout><AdminProfilePage /></AdminLayout></RequireAuth>} />

            {/* Voter */}
            <Route path="/voter" element={<RequireAuth role="VOTER"><VoterLayout><VoterDashboard /></VoterLayout></RequireAuth>} />
            <Route path="/voter/elections" element={<RequireAuth role="VOTER"><VoterLayout><ActiveElectionsPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/elections/:id" element={<RequireAuth role="VOTER"><VoterLayout><ElectionDetailVoterPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/elections/:id/vote" element={<RequireAuth role="VOTER"><VoterLayout><VotePage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/vote-submitted" element={<RequireAuth role="VOTER"><VoterLayout><VoteSubmittedPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/my-votes" element={<RequireAuth role="VOTER"><VoterLayout><MyVotesPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/results" element={<RequireAuth role="VOTER"><VoterLayout><VoterResultsPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/notifications" element={<RequireAuth role="VOTER"><VoterLayout><VoterNotificationsPage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/profile" element={<RequireAuth role="VOTER"><VoterLayout><VoterProfilePage /></VoterLayout></RequireAuth>} />
            <Route path="/voter/settings" element={<RequireAuth role="VOTER"><VoterLayout><VoterSettingsPage /></VoterLayout></RequireAuth>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
