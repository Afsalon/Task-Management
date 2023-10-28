

import { Link } from 'react-router-dom';
import './css/table.css';
import formatTimestamp from "./time";
import { style } from '../Store/constants';
const Task = (props) =>
{
    const { id, date, deadline, priority, status, title, user } = props;



    return (
        <Link to={`/detail/${id}/`} className="task">
            <div className="task-line1">
                <div style={style[priority]} className="task-priority">{priority}</div>
                <div style={style[status]} className="task-status">{status}</div>
            </div>
            <div className="task-line2">
                <div className="task-title">{title}</div>
            </div>
            <div className="task-line3">
                <div className="task-user">{user}</div>
                <div className="task-date">{formatTimestamp(date)}</div>
                <div className="task-deadline">{deadline} ⏰ </div>
            </div>
        </Link>
    );
}

export default Task;