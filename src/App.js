import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnterData from "./components/EnterData";
import Results from "./components/Results";
import LoginPage from "./components/LoginPage";
import Discover from "./components/Discover";
import { createContext, useState } from "react";

export const context = createContext();
function App() {
  const [chatResponse, setChatResponse] = useState([]);
  const [enteredPrompt, setEnteredPrompt] = useState("");
  const [libraryData, setLibraryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  return (
    <div className="bg-pxty-grey h-screen text-pxty-text-color">
      <context.Provider
        value={{
          chatResponse,
          setChatResponse,
          enteredPrompt,
          setEnteredPrompt,
          libraryData,
          setLibraryData,
          loading,
          setLoading,
          openModal,
          setOpenModal,
          closeModal,
          setCloseModal,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/home" exact element={<EnterData />} />
            <Route path="/results" exact element={<Results />} />
            <Route path="/discover" exact element={<Discover />} />
          </Routes>
        </Router>
      </context.Provider>
    </div>
  );
}

export default App;
