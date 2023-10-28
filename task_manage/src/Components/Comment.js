import formatTimestamp from "./time";
const Comment = (props) =>
{
    const { id, comment, user, date } = props
    return (
        <div className="detail-comment">
            <p className="comment-user">{user} </p>
            <p style={{ fontSize: '0.6rem', color: 'white', letterSpacing: '1px', marginTop: '0' }}>{formatTimestamp(date)}</p>
            <p className="comment-comment">{comment}</p>
        </div>
    )
}

export default Comment;