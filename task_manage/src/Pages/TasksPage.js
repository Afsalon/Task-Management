import { useCallback, useContext, useEffect, useState } from "react";
import { fetchTasks } from '../Services/fetchTasks';
import { useNavigate } from "react-router-dom";
import { ContextApi } from '../App';
import { actions } from "../Store/actions";
import '../Components/css/loader.css';
import Task from "../Components/Task";
import Navbar from "../Components/Navbar";
import { createTask } from "../Services/createTask";
const TasksPage = () =>
{
    const nav = useNavigate()
    const { state, dispatch } = useContext(ContextApi)
    const [showTaskForm, setShowTaskForm] = useState(false);

    const fetch_tasks = useCallback(() =>
    {
        fetchTasks().then((response =>
        {
            if (response.status === 200)
            {
                dispatch({ type: actions.set_tasks, payload: response.data })
            }
            else
            {
                localStorage.removeItem('tokens');
                nav("/login")
            }
        }))
    }, [nav, dispatch])

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user', e.target[0].value)
        formData.append('title', e.target[1].value)
        formData.append('description', e.target[2].value)
        formData.append('priority', e.target[3].value)
        formData.append('status', e.target[4].value)
        formData.append('deadline', `${e.target[5].value}`)

        createTask(formData).then((response) =>
        {
            dispatch({ type: actions.append_task, payload: response.data })
        }).catch((response) =>
        {
            console.log(response)
        })
    }
    useEffect(() =>
    {
        fetch_tasks()
    }, [fetch_tasks])

    return (
        <main className="tasks-bg">
            <Navbar />
            <button className="addTaskButton" onClick={() => setShowTaskForm(!showTaskForm)}>
                {showTaskForm ? 'Close' : 'Add a Task'}
            </button>
            {showTaskForm && (
                <form onSubmit={(e) => handleSubmit(e)} className="task-form">
                    <input className="form-user" type="text" placeholder="User id" />
                    <input className="form-title" type="text" placeholder="Task Title" />
                    <input className="form-description" type='text' placeholder="Description" />
                    <select className="form-priority" id="priority">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <select className="form-status" id="status">
                        <option value="TO DO">To Do</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <input className="form-deadline" type="date" id="deadline" />
                    <button className="submit-task">Submit Task</button>
                </form>
            )}
            {state.tasks_loader ? <span className="loader-2"></span> :
                <main className="task-bg">
                    {state.tasks.map((obj) =>
                    {
                        return <Task key={obj.id} id={obj.id} user={obj.user.username} title={obj.title} status={obj.status} priority={obj.priority} date={obj.creation_date} deadline={obj.deadline} />
                    })}
                </main>
            }
        </main >
    );
}

export default TasksPage;
