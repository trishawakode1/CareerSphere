import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";

import Layout from "./Layout";

import Homepage from "./pages/Homepage";
import Explore from "./pages/Explore";
import AptitudeTest from "./pages/AptitudeTest";
import Assessment from "./pages/Assessment";
import Report from "./pages/Report";
import SkillGap from "./pages/SkillGap";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

function App() {

  const [isAuthed, setIsAuthed] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>

        {/* Home */}
        <Route
          index
          element={isAuthed ? <Homepage /> : <Landing />}
        />

        {/* Dashboard Pages */}
        <Route path="explore" element={<Explore />} />
        <Route path="aptitude-test" element={<AptitudeTest />} />
        <Route path="career-assessment" element={<Assessment />} />
        <Route path="report" element={<Report />} />
        <Route path="skill-gap" element={<SkillGap />} />
        <Route path="profile" element={<Profile />} />

      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;