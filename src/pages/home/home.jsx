import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import HomeLeft from "../../components/home/left/HomeLeft";
import HomeRight from "../../components/home/right/HomeRight";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";

export default function Home({setVisible, posts}) {
  const { user } = useSelector((user) => ({ ...user }));

  console.log(posts)
  
  return (
    <div className="home">
      <Header />
      <HomeLeft user={user} />
      <div className="home-middle">
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post}/>
          // <div className="post" key={post._id}>
          //   {post._id}
          // </div>
        ))}
        </div>
      </div>
      <HomeRight user={user}/>
    </div>
  );
}