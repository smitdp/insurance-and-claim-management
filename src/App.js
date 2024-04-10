import { Routes, Route } from "react-router-dom";
import UserNav from "./components/UserNav";
import Policies from "./components/Policies";
import PolicyDetails from "./components/policyDetails/PolicyDetails";
import Login from "./components/Login";
import UserHomePage from "./pages/UserHomePage";
import AuthService from "./services/AuthService";
import MyPolicies from "./components/MyPolicies";
import LoginProvider from "./context/LoginContext";
import UserInformationProvider from "./context/UserInformationContext";
import AppLayout from "./pages/AppLayout";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <div>
      <LoginProvider>
        <UserInformationProvider>
          <Routes>
            {/* <Route path="/" element={<UserHomePage />} /> */}
            <Route path="/" element={<AppLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path = "/register" element={<RegisterPage /> }/>
            <Route path="/policies" element={<Policies />} />
            <Route path="/policy" element={<PolicyDetails />} />
            <Route path="/my-policies" element={<MyPolicies />} />
          </Routes>
        </UserInformationProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
