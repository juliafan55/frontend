import "./post.css"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { Dots } from "../../svg"

export default function Post({post}) {
    return (
        <div className="post">
      <div className="post-header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post-header-left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header-col">
            <div className="post-profile-name">
              {post.user.first_name} {post.user.last_name}
            <div className="updated-p">
                {post.type==="profilePicture" && `updated their profile picture`}
                {post.type==="cover" && `updated their cover picture`}
            </div>
            </div>
            <div className="post-profile-privacy-date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
            </div>
          </div>
        </Link>
        <div className="post-header-right">
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
    </div>
  );
}