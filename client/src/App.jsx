import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ShowData = React.lazy(() => import("./pages/ShowData"));
const AddTransaction = React.lazy(() => import("./pages/AddTransaction"));
const Prediction = React.lazy(() => import("./pages/Prediction"));
const Funds = React.lazy(() => import("./pages/Funds"));
const Start = React.lazy(() => import("./pages/Start"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Start />
          </Suspense>
        }
      />
      <Route
        path="/add-data"
        element={
          <ProtedtedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <AddTransaction />
            </Suspense>
          </ProtedtedRoutes>
        }
      />
      <Route
        path="/show-data"
        element={
          <ProtedtedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <ShowData />
            </Suspense>
          </ProtedtedRoutes>
        }
      />
      <Route
        path="/predict-data"
        element={
          <ProtedtedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Prediction />
            </Suspense>
          </ProtedtedRoutes>
        }
      />
      <Route
        path="/funds"
        element={
          <ProtedtedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Funds />
            </Suspense>
          </ProtedtedRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
};

export function ProtedtedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
