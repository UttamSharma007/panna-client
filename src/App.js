import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnterData from "./components/EnterData";
import Results from "./components/Results";
import LoginPage from "./components/LoginPage";
import Discover from "./components/Discover";
import { createContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginPage from "./components/GoogleLoginPage";

export const context = createContext();
function App() {
  const [activePage, setActivePage] = useState("home");
  const [chatResponse, setChatResponse] = useState([]);
  const [enteredPrompt, setEnteredPrompt] = useState("");
  const [libraryData, setLibraryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  return (
    <div className="bg-pxty-dark-mid h-screen text-pxty-light-text">
      <GoogleOAuthProvider clientId="412833534919-5etl75bd9mmfnelsibi9efvpdk5ejmkl.apps.googleusercontent.com">
        <context.Provider
          value={{
            activePage,
            setActivePage,
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
              <Route path="/login" exact element={<GoogleLoginPage />} />
            </Routes>
          </Router>
        </context.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
