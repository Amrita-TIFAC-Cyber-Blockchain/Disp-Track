import "./App.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import {StateProvider} from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducer";
import RetrieveDetails from "./components/RetrieveDetails";


function App() {

  return (
    <div className="mainApp">
      <StateProvider  initialState={initialState} reducer={reducer}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/DisP-Track" element={<MainContent />}></Route>
            <Route path="/DisP-Track/upload" element={<UploadForm />}></Route>
            <Route path="/Disp-Track/retrieve" element={<RetrieveDetails/>}></Route>
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </div>
  )
}

export default App;
