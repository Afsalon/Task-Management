import { useReducer } from "react";
import { reducer } from './reducer';

const initialState = {
    login_loader: false,
    login_error: false,
    signup_loader: false,
    signup_error: false,
    tasks_loader: true,
    tasks: [],
    task: {},
    task_loader: true,
    comments: [],
    documents: []
}
const Context = () =>
{
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch];
}

export default Context;