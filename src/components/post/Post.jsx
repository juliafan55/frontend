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
                <div className="post-text"> {post.text} </div>
                {
                    post.images && post.images.legnth &&
                    <div>
                        {
                            post.images.map((image, i) => (
                                <img src={image.url} key={i} alt="" />
                            ))
                        }
                    </div>
                }
            </>
            )}
    </div>
    )
}
