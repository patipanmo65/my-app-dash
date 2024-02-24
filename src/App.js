import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //Switch
import Sidebar from "./components/Sidebar";
import DataTablePage from "./pages/DataTablePage";
import ChartPage from "./pages/ChartPage";
import InternalPatient from "./pages/InternalPatient";
import ExternalPatient from "./pages/ExternalPatient";
import PatientDetailPage from "./pages/PatientDetailPage";
import Content from "./components/Content";
// import PatientDetailPage from "./PatientDetailPage";
import AppBar from "./components/AppBar"; // สมมติว่าคุณมี AppBar ที่เตรียมไว้

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Sidebar />
      <Routes>
        <Route path="/content" element={<Content />} />
        {/* <Route path="/patient/:id" component={<PatientDetailPage />} /> */}
        <Route path="/data-table" element={<DataTablePage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/PatientDetailPage" element={<PatientDetailPage />} />
        <Route path="/InternalPatient" element={<InternalPatient />} />
        <Route path="/ExternalPatient" element={<ExternalPatient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
