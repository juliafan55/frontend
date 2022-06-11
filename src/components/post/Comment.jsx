import Moment from "react-moment";

export default function Comment({ comment }) {

    console.log("------>", comment)
    return (
      <div className="comment">
        <img src={comment.commentBy.picture} alt="" className="comment-img" />
        <div className="comment-col">
          <div className="comment-wrap">
            <div className="comment-name">
              {comment.commentBy.first_name} {comment.commentBy.last_name}
            </div>
            <div className="comment-text">{comment.comment}</div>
          </div>

          <div className="comment-actions">
            <span>Like</span>
            <span>Reply</span>
            <span>
              <Moment fromNow interval={30}>
                {comment.commentAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
    );
  }