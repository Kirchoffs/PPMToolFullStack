import axios from "../api/axios";
import setAlert from "./alertActions";
import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        await axios.post("/api/project", project);
        history.push("/dashboard");
    } catch (errors) {
        Object.values(errors.response.data).forEach(error => {
                dispatch(setAlert(error, 'danger'));
        });
    }
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
};

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
        type: GET_PROJECT,
        payload: res.data
        });
    } catch (errors) {
        history.push("/dashboard");
    }
};

export const deleteProject = id => async dispatch => {
    if (
        window.confirm(
        "Are you sure? This will delete the project and all the data related to it"
        )
    ) {
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        });
    }
};
