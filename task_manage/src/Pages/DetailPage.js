import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContextApi } from '../App';
import { fetchTask } from "../Services/fetchTask";
import { actions } from "../Store/actions";
import '../Components/css/loader.css';
import '../Components/css/detail.css';
import Comment from "../Components/Comment";
import formatTimestamp from "../Components/time";
import { fetchComments } from "../Services/fetchComments";
import { fetchDocuments } from '../Services/fetchDocuments'
import { domain } from "../Store/constants";
import Navbar from "../Components/Navbar";
import { postComment } from "../Services/postComment";
import { updateTask } from "../Services/updateTask";

const DetailPage = () =>
{
    const params = useParams()
    const { state, dispatch } = useContext(ContextApi);
    const nav = useNavigate()

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [status, setStatus] = useState("")
    const [deadline, setDeadline] = useState("")
    const [user, setUser] = useState("")


    const fetch_task = useCallback((id) =>
    {
        fetchTask(id).then((response) =>
        {
            if (response.status === 200)
            {
                dispatch({ type: actions.set_task, payload: response.data })
                setTitle(response.data.title)
                setDate(response.data.creation_date)
                setDescription(response.data.description)
                setPriority(response.data.priority)
                setStatus(response.data.status)
                setDeadline(response.data.deadline ? response.data.deadline : "")
                setUser(response.data.user)
            }
            else
            {
                localStorage.removeItem('tokens');
                nav("/login")
            }
        })
    }, [dispatch, nav])

    const fetch_comments = useCallback((id) =>
    {
        fetchComments(id).then((response) =>
        {
            if (response.status === 200)
            {
                dispatch({ type: actions.set_comments, payload: response.data })
            }
            else
            {
                localStorage.removeItem('tokens');
                nav("/login")
            }
        })
    }, [nav, dispatch]);

    const fetch_documents = useCallback((id) =>
    {
        fetchDocuments(id).then((response) =>
        {
            if (response.status === 200)
            {
                dispatch({ type: actions.set_documents, payload: response.data })
            }
            else
            {
                localStorage.removeItem('tokens');
                nav("/login")
            }
        })
    }, [nav, dispatch]);


    const update_task = (e) =>
    {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        formData.append('user', user.id)
        formData.append('description', description)
        formData.append('priority', priority)
        formData.append('status', status)
        formData.append('deadline', deadline)
        updateTask(formData, params['id']).then((response) =>
        {
            console.log(response)
            if (response.status === 200)
            {
                alert('updated')
            }
        })
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        postComment(e.target[0].value, params['id'])
    }


    useEffect(() =>
    {
        fetch_task(params['id']);
        fetch_comments(params['id']);
        fetch_documents(params['id']);
    }, [params['id']])



    return (
        <main className="detail-bg">
            <Navbar />
            {state.task_loader ? <span className="loader-2"></span> :
                <div className="task-details">
                    <form onSubmit={(e) => update_task(e)}>
                        <input type="text" name='title' className="detail-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <p className="detail-date">{formatTimestamp(date)}</p>
                        <textarea className="detail-descrip" value={description} onChange={(e) => setDescription(e.target.value)} />

                        <>
                            {state.documents.map((obj) =>
                            {
                                return <div key={obj.id}>
                                    <img className="document-image" src={`${domain}${obj.image}`} />
                                </div>
                            })}</>

                        <input className="detail-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" />Deadline
                        <div className="encase">
                            <label className="detail-priority">Priority</label>
                            <select value={priority}
                                onChange={(e) => setPriority(e.target.value)} id="priorityDropdown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <label className="detail-status">Status:</label>
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)} id="statusDropdown">
                                <option value="TO DO">TO DO</option>
                                <option value="IN PROGRESS">IN PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                            <span className="user-info">User: {state.task.user.username}</span>
                        </div>
                        <button type="submit" className="save-button">Save Changes</button>
                    </form>
                </div>}
            {state.comments.map((obj) =>
            {
                return <Comment key={obj.id} id={obj.id} comment={obj.comment} user={obj.user.username} date={obj.creation_date} />
            })}
            <form onSubmit={(e) => handleSubmit(e)} className="add-comment">
                <input name="comment" className="comment-field" type='text' placeholder="add a comment" />
                <button className="detail-button">Add</button>
            </form>



        </main>
    )
}
export default DetailPage;
