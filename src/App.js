import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
