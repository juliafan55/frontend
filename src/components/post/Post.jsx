import "./post.css"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { Dots } from "../../svg"
import ReactsPopup from "./ReactsPopup"
import { useEffect, useState } from "react"
import CreateComment from "./CreateComment"
import PostMenu from "./PostMenu"
import Comment from "./Comment"


export default function Post({ post, user }) {
  const [visible, setVisible] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [comments, setComments] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    setComments(post?.comments)
  }, [post])
  
  const showMore = () => {
    setCount((prev) => prev + 3);
}

  console.log("HEREEEE", comments)

    return (
        <div className="post">
      <div className="post-header">
        <Link
          to={`/profile/${post.user?.username}`}
          className="post-header-left"
        >
          <img src={post.user?.picture} alt="" />
          <div className="header-col">
            <div className="post-profile-name">
              {post.user?.first_name} {post.user?.last_name}
            {/* <div className="updated-p">
                {post.type==="profilePicture" && `updated their profile picture`}
                {post.type==="cover" && `updated their cover picture`}
            </div> */}
            </div>
            <div className="post-profile-privacy-date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
            </div>
          </div>
        </Link>
        <div className="post-header-right" onClick={() => setShowMenu((prev) => !prev)}>
          <Dots color="#828387" />
        </div>
            </div>
            {post.background ? (
                <div
                    className="post-bg"
                    style={{ backgroundImage: `url(${post.background})` }} >
                        <div className="post-bg-text"> {post.text} </div>
                </div>
            ) : (
            <>
               <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
        )}
        <div className="post-info">
          <div className="reacts-count">
            <div className="react-count-imgs"></div>
            <div className="reacts-count-num"></div>
          </div>

          <div className="to-right">
            <div className="comments-count"> {comments.length} comments</div>
            <div className="share-count"> 1 share </div>
          </div>
        </div>
        <div className="post-actions">
          <ReactsPopup visible={visible} setVisible={setVisible}/>
          <div className="post-action hover-blue"
            onMouseOver={() => {
              setTimeout(() => {
                setVisible(true)
              }, 300)
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setVisible(false)
              }, 500)
             }}>
            <i className="like_icon"></i>
            <span>Like</span>
          </div>
          <div className="post-action hover-blue">
            <i className="comment_icon"></i>
            <span>Comment</span>
          </div>
        </div>
        <div className="comment-wrap">
          <div className="comments-order">
            <CreateComment postId={post._id} user={user} setCount={setCount} setComments={setComments}/>
            {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className="view-comments" onClick={() => showMore()}>
            View more comments
          </div>
        )}
          </div>
          {
            showMenu && (
              <PostMenu userId={user.id} postUserId={post.user._id} setShowMenu={setShowMenu}/>
            )
          }
        </div>
    </div>
  );
}
