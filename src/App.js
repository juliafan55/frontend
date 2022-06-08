import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
