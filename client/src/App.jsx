import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

const ShowData = React.lazy(() => import("./pages/ShowData"));
const AddTransaction = React.lazy(() => import("./pages/AddTransaction"));
const Prediction = React.lazy(() => import("./pages/Prediction"));
const Funds = React.lazy(() => import("./pages/Funds"));
const Start = React.lazy(() => import("./pages/Start"));
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/add-data"
          element={
            <ProtedtedRoutes>
              <Suspense>
                <AddTransaction />
              </Suspense>
            </ProtedtedRoutes>
          }
        />
        <Route
          path="/show-data"
          element={
            <ProtedtedRoutes>
              <Suspense>
                <ShowData />
              </Suspense>
            </ProtedtedRoutes>
          }
        />
        <Route
          path="/predict-data"
          element={
            <ProtedtedRoutes>
              <Suspense>
                <Prediction />
              </Suspense>
            </ProtedtedRoutes>
          }
        />
        <Route
          path="/funds"
          element={
            <ProtedtedRoutes>
              <Suspense>
                <Funds />
              </Suspense>
            </ProtedtedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
      </Routes>
    </>
  );
};
export function ProtedtedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
