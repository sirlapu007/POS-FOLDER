import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard, Home, Menu, Orders, Tables } from "./pages";
import Header from "./components/shared/Header";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useLocalData from "./hooks/useLocalData";
import FullScreenLoader from "./components/shared/FullScreenLoader";


function Layout({ children }) {
  const location = useLocation();
 const isLoading = useLocalData();
  const hideHeaderRoutes = ["/auth"];
  
if(isLoading) return <FullScreenLoader />
  return (
    <> 
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector(state => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return children;
}

function App() {
  const { isAuth } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            </Layout>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <Layout>
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            </Layout>
          }
        />

        {/* Tables */}
        <Route
          path="/tables"
          element={
            <Layout>
              <ProtectedRoutes>
                <Tables />
              </ProtectedRoutes>
            </Layout>
          }
        />

        {/* Menu */}
        <Route
          path="/menu"
          element={
            <Layout>
              <ProtectedRoutes>
                <Menu />
              </ProtectedRoutes>
            </Layout>
          }
        />

        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            </Layout>
          }
        />

        {/* Auth */}
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/" /> : <Auth />}
        />

        {/* 404 Not Found */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
