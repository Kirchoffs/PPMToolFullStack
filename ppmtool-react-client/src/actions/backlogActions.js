import axios from '../api/axios';
import { GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';
import setAlert from './alertActions';

export const addProjectTask = (
    backlogId, 
    projectTask, 
    history
) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
    } catch(errors) {
        Object.values(errors.response.data).forEach(error => {
            dispatch(setAlert(error, 'danger'));
        });
    }
};

export const getBacklog = backlogId => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    } catch(errors) {
        Object.values(errors.response.data).forEach(error => {
            dispatch(setAlert(error, 'danger'));
        });
    }
}

export const getProjectTask = (backlogId, ptId, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}/${ptId}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch(errors) {
        history.push('/dashboard');
    }
}

export const updateProjectTask = (backlogId, ptId, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${ptId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
    } catch(errors) {
        Object.values(errors.response.data).forEach(error => {
            dispatch(setAlert(error, 'danger'));
        });
    }
}

export const deleteProjectTask = (backlogId, ptId) => async dispatch => {
    if (window.confirm(`You are deleting project task ${ptId}, and this action cannot be undone`)) {
        await axios.delete(`/api/backlog/${backlogId}/${ptId}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: ptId
        });
    }
}
