import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";

import Layout from "./Layout";
import ProtectedRoute from "./auth/ProtectedRoute";

import Homepage from "./pages/Homepage";
import Explore from "./pages/Explore";
import AptitudeTest from "./pages/AptitudeTest";
import Assessment from "./pages/Assessment";
import Report from "./pages/Report";
import SkillGap from "./pages/SkillGap";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>

        {/* Landing Page */}
        <Route index element={<Landing />} />

        {/* Homepage after login */}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Pages */}
        <Route
          path="explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="aptitude-test"
          element={
            <ProtectedRoute>
              <AptitudeTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="career-assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="skill-gap"
          element={
            <ProtectedRoute>
              <SkillGap />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;