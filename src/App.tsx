import { useState } from "react";
import { Button, Icon, Layout } from "@stellar/design-system";
import "./App.module.css";
import ConnectAccount from "./components/ConnectAccount.tsx";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Debugger from "./pages/Debugger.tsx";
import { LoginScreen } from "./components/LoginScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { PurchaseScreen } from "./components/PurchaseScreen";

// CO2 Platform App with Figma designs
function CO2PlatformApp() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'dashboard' | 'purchase'>('login');

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: 'dashboard' | 'purchase') => {
    setCurrentScreen(screen);
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentScreen === 'dashboard') {
    return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentScreen === 'purchase') {
    return <PurchaseScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  return null;
}

const AppLayout: React.FC = () => (
  <main>
    <Layout.Header
      projectId="CañaCrypto"
      projectTitle="CañaCrypto Platform"
      contentRight={
        <>
          <nav className="flex gap-2">
            <NavLink
              to="/co2-platform"
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  disabled={isActive}
                >
                  <Icon.Globe01 size="md" />
                  CO₂ Platform
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/debug"
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  disabled={isActive}
                >
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              )}
            </NavLink>
          </nav>
          <ConnectAccount />
        </>
      }
    />
    <Outlet />
    <Layout.Footer>
      <span>
        © {new Date().getFullYear()} CañaCrypto. Licensed under the{" "}
        <a
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License, Version 2.0
        </a>
        .
      </span>
    </Layout.Footer>
  </main>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<CO2PlatformApp />} />
      <Route path="/stellar" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="debug" element={<Debugger />} />
        <Route path="debug/:contractName" element={<Debugger />} />
      </Route>
      <Route path="/co2-platform" element={<CO2PlatformApp />} />
    </Routes>
  );
}

export default App;
