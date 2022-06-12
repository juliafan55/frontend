import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/creatPostPopup/createPostPopup";
import { useSelector } from "react-redux"
import { useState, useReducer, useEffect } from "react"
import axios from "axios"
import { postsReducer } from "./helpers/reducers";

// function reducer(state, action) {
//   switch (action.type) {
//     case "POSTS_REQUEST":
//       return { ...state, loading: true, error: "" };
//     case "POSTS_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: "",
//       };
//     case "POSTS_ERROR":
//       return { ...state, loading: false, error: action.payload }
      
//     default:
//       return state;
//   }
// }


function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false)
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, { loading: false, posts: [], error: "" })
  
  useEffect(() => {
    getAllPosts();
  },[])

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };


  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} posts={posts} dispatch={dispatch}/>}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile setVisible={setVisible} />} exact />
          <Route path="/profile/:username" element={<Profile setVisible={setVisible} />} exact />
          <Route path="/" element={<Home setVisible={setVisible} posts={posts}/>} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
