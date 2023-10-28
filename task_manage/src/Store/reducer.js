import { actions } from './actions';

export const reducer = (state, action) =>
{
    if (action.type === actions.login)
    {
        localStorage.setItem('tokens', JSON.stringify(action.payload));
        return {
            ...state,
            login_loader: false,
            login_error: false,
        }
    }
    else if (action.type === actions.set_login_loader)
    {
        return {
            ...state,
            login_loader: true,
            login_error: false
        }
    }
    else if (action.type === actions.unset_login_loader)
    {
        return {
            ...state,
            login_loader: false,
            login_error: true,
        }
    }
    else if (action.type === actions.signup)
    {
        return {
            ...state,
            signup_loader: true,
        }
    }
    else if (action.type === actions.set_tasks)
    {
        return {
            ...state,
            tasks_loader: false,
            tasks: action.payload
        }
    }
    else if (action.type === actions.set_task)
    {
        return {
            ...state,
            task: action.payload,
            task_loader: false
        }
    }
    else if (action.type === actions.append_task)
    {
        return {
            ...state,
            tasks: [action.payload, ...state.tasks]
        }
    }
    else if (action.type === actions.set_comments)
    {
        return {
            ...state,
            comments: action.payload,

        }
    }
    else if (action.type === actions.append_comment)
    {
        console.log("called")
        return {
            ...state,
            comments: [action.payload, ...state.comments]
        }
    }
    else if (action.type === actions.set_documents)
    {
        return {
            ...state,
            documents: action.payload
        }
    }
    else
    {
        return {
            ...state
        }
    }

}
