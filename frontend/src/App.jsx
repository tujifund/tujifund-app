import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { SearchProvider } from './context/SearchContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/UserDashboard/Dashboard'
import PaymentsPage from './pages/UserDashboard/Payments/PaymentsPage'
// import VaultInuaLoans from './pages/VaultInuaLoan/VaultInuaLoans'
import ChatPage from './pages/UserDashboard/Chat/ChatPage'
import NoticeboardPage from './pages/UserDashboard/Noticeboard/NoticeboardPage'
import LearningPage from './pages/UserDashboard/Learning/LearningPage'
import ReportsPage from './pages/UserDashboard/Reports/ReportsPage'
import SettingsPage from './pages/UserDashboard/Settings/SettingsPage'
import ChamasListPage from './pages/UserDashboard/ChamasListPage'
import CreateChama from './pages/UserDashboard/CreateChama';
import ChamaDashboardLayout from './pages/Chamas/ChamaDashboard/ChamaDashboardLayout'
import ChamaHome from './pages/Chamas/ChamaDashboard/Home/ChamaHome'
import MembershipPage from './pages/Chamas/ChamaDashboard/Membership/MembershipPage'
import MeetingsPage from './pages/Chamas/ChamaDashboard/Meetings/MeetingsPage'
import VaultInuaLoan from './pages/Chamas/ChamaDashboard/Loans/VaultInuaLoan'
import AccountsPage from './pages/Chamas/ChamaDashboard/Accounts/AccountsPage'
import SoftLoansPage from './pages/Chamas/ChamaDashboard/SoftLoans/SoftLoansPage'
import MerryGoRoundPage from './pages/Chamas/ChamaDashboard/MerryGoRound/MerryGoRoundPage'
import SharesPage from './pages/Chamas/ChamaDashboard/Shares/SharesPage'
import WelfarePage from './pages/Chamas/ChamaDashboard/Welfare/WelfarePage'
import GoalsPage from './pages/Chamas/ChamaDashboard/Goals/GoalsPage'
import NotificationsPage from './pages/Chamas/ChamaDashboard/Notifications/NotificationsPage'
import BillingPage from './pages/Chamas/ChamaDashboard/Billing/BillingPage'
import ChamaSettingsPage from './pages/Chamas/ChamaDashboard/Settings/SettingsPage'
import VaultManager from './pages/Chamas/ChamaDashboard/VaultManager';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientAccounts from './pages/admin/ClientAccounts';
import Notifications from './pages/admin/Notifications';
import Overview from './pages/admin/Overview';
import PaymentRecording from './pages/admin/PaymentRecording';
import Reports from './pages/admin/Reports';
import WithdrawalRequests from './pages/admin/WithdrawalRequests';
import Adminsettings from './pages/admin/Adminsettings';
import UserFeedback from './pages/admin/UserFeedback';
import AuditLogs from './pages/admin/AuditLogs';
import EducationalResources from './pages/admin/EducationalResources';
import PaymentModuleManagement from './pages/admin/PaymentModuleManagement';
import SubscriptionManagement from './pages/admin/SubscriptionManagement';
import NotFound from './pages/NotFound/NotFound'
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import Terms from './pages/auth/Terms';
import PrivacyPolicy from './pages/auth/PrivacyPolicy';
import ChamaCke from './pages/CompanyPortfolio/TujiFund';
import About from './pages/CompanyPortfolio/About';
import Services from './pages/CompanyPortfolio/Services';
import Blog from './pages/CompanyPortfolio/Blog';
import Contact from './pages/CompanyPortfolio/Contact';
// import Home from './pages/CompanyPortfolio/Home';
import SavingsManagement from './pages/CompanyPortfolio/SavingsManagement';
import InvestmentTracking from './pages/CompanyPortfolio/InvestmentTracking';
import LoanProcessing from './pages/CompanyPortfolio/LoanProcessing';
import FinancialReports from './pages/CompanyPortfolio/FinancialReports';
import PricingPlans from './pages/CompanyPortfolio/PricingPlans';
import ChamaManagement from './pages/CompanyPortfolio/services/ChamaManagement';
import FinancialManagement from './pages/CompanyPortfolio/services/FinancialManagement';
import InvestmentSolutions from './pages/CompanyPortfolio/services/InvestmentSolutions';
import LoanManagement from './pages/CompanyPortfolio/services/LoanManagement';
import MerryGoRound from './pages/CompanyPortfolio/services/MerryGoRound';
import WelfareFund from './pages/CompanyPortfolio/services/WelfareFund';
import SharesManagement from './pages/CompanyPortfolio/services/SharesManagement';
import MeetingManagement from './pages/CompanyPortfolio/services/MeetingManagement';
import VaultInuaLoans from './pages/UserDashboard/VaultInuaLoan/VaultInuaLoans';
import DigitalLoans from './pages/UserDashboard/VaultInuaLoan/DigitalLoans';
import MobileLoans from './pages/UserDashboard/VaultInuaLoan/MobileLoans';

import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <Router>
          <Routes>
            {/* portfolio Webpages */}
            <Route path="/" element={<ChamaCke />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pricing" element={<PricingPlans />} />
            <Route index element={<ChamaCke />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="blog" element={<Blog />} />
            <Route path="home" element={<ChamaCke />} />
            
            {/*portfolio Service Pages */}
            <Route path="services/savings" element={<SavingsManagement />} />
            <Route path="services/investments" element={<InvestmentTracking />} />
            <Route path="services/loans" element={<LoanProcessing />} />
            <Route path="services/reports" element={<FinancialReports />} />
            <Route path="/services/chama-management" element={<ChamaManagement />} />
            <Route path="/services/financial-management" element={<FinancialManagement />} />
            <Route path="/services/investment-solutions" element={<InvestmentSolutions />} />
            <Route path="/services/loan-management" element={<LoanManagement />} />
            <Route path="/services/merry-go-round" element={<MerryGoRound />} />
            <Route path="/services/welfare-fund" element={<WelfareFund />} />
            <Route path="/services/shares-management" element={<SharesManagement />} />
            <Route path="/services/meeting-management" element={<MeetingManagement />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="chamas" element={<ChamasListPage />} />
              <Route path="create-chama" element={<CreateChama />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="noticeboard" element={<NoticeboardPage />} />
              <Route path="learning" element={<LearningPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              {/*user Dashboard Loan Routes */}
              <Route path="loans" element={<VaultInuaLoans />} />
              <Route path="loans/digital" element={<DigitalLoans />} />
              <Route path="loans/mobile" element={<MobileLoans />} />
            </Route>

            {/* Chama Dashboard Routes */}
            <Route path="ChamaDashboard/:chamaId" element={<ChamaDashboardLayout />}>
              <Route path="home" element={<ChamaHome />} />
              <Route path="membership" element={<MembershipPage />} />
              <Route path="meetings" element={<MeetingsPage />} />
              <Route path="accounts" element={<AccountsPage />} />
              <Route path="Loans" element={<VaultInuaLoan />} />
              <Route path="soft-loans" element={<SoftLoansPage />} />
              <Route path="merry-go-round" element={<MerryGoRoundPage />} />
              <Route path="shares" element={<SharesPage />} />
              <Route path="welfare" element={<WelfarePage />} />
              <Route path="goals" element={<GoalsPage />} />
              <Route path="vault-manager" element={<VaultManager />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="settings" element={<ChamaSettingsPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="/admin/client-accounts" element={<ClientAccounts />} />
              <Route path="/admin/notifications" element={<Notifications />} />
              <Route path="/admin/overview" element={<Overview />} />
              <Route path="/admin/payment-recording" element={<PaymentRecording />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/withdrawal-requests" element={<WithdrawalRequests />} />
              <Route path="/admin/SubscriptionManagement "element={<SubscriptionManagement />}/>
              <Route path="/admin/PaymentModuleManagement" element={<PaymentModuleManagement />}/>
              <Route path="/admin/EducationalResources" element={<EducationalResources/>}/>
              <Route path="/admin/settings" element={<Adminsettings />} />
              <Route path="/admin/user-feedback" element={<UserFeedback />} />
              <Route path="/admin/audit-logs" element={<AuditLogs />} />
          </Route>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App
