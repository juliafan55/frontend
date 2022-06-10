import "./home.css"
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import HomeLeft from "../../components/home/left/HomeLeft";
import HomeRight from "../../components/home/right/HomeRight";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";

export default function Home({setVisible, posts}) {
  const { user } = useSelector((user) => ({ ...user }));
  
  return (
    <div className="home">
      <Header />
      <HomeLeft user={user} />
      <div className="home-middle">
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post}/>
        ))}
        </div>
      </div>
      <HomeRight user={user}/>
    </div>
  );
}