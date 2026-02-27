import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

const Layout = () => {

    const isAuthed = true;
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Sidebar (Fixed) */}
      <div style={{ flexShrink: 0 }}>
        {isAuthed && <SideBar />}
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;