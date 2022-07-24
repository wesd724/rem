import axios from "axios";
import { LIST_LENGTH_PER_PAGE as length } from "../data/constant";

export const createData = data => {
    return axios.post(process.env.REACT_APP_URL + "/create", data);
}

export const readData = page => {
    return axios.get(process.env.REACT_APP_URL + `/read/${page}`, {
        params:
            { length }
    });
}

export const updateData = data => {
    return axios.put(process.env.REACT_APP_URL + "/update", data);
}

export const deleteData = id => {
    return axios.delete(process.env.REACT_APP_URL + "/delete", {
        data: {
            _id: id
        }
    });
}

export const newReply = data => {
    return axios.post(process.env.REACT_APP_NEW_REPLY_URL, data);
}

export const addReply = data => {
    return axios.post(process.env.REACT_APP_ADD_REPLY_URL, data);
}

export const readReply = boardId => {
    return axios.get(process.env.REACT_APP_READ_REPLY_URL, {
        params:
            { boardId }
    });
}

export const deleteReply = boardId => {
    return axios.delete(process.env.REACT_APP_DELETE_REPLY_URL, {
        data: {
            boardId
        }
    });
}

export const updateOneReply = data => {
    return axios.put(process.env.REACT_APP_UPDATE_ONE_REPLY_URL, data);
}

export const deleteOneReply = ({ boardId, index }) => {
    return axios.delete(process.env.REACT_APP_DELETE_ONE_REPLY_URL, {
        data: {
            boardId,
            index
        }
    });
}

export const addViews = data => {
    return axios.post(process.env.REACT_APP_VIEWS_URL, data);
}

export const readViewText = data => {
    return axios.post(process.env.REACT_APP_READ_VIEW_TEXT_URL, data);
}

export const recommend = data => {
    return axios.put(process.env.REACT_APP_RECOMMEND_URL, data);
}

export const readRecommend = data => {
    return axios.post(process.env.REACT_APP_READ_RECOMMEND_URL, data);
}

export const login = data => {
    return axios.post(process.env.REACT_APP_LOGIN_URL, data);
}

export const register = data => {
    return axios.post(process.env.REACT_APP_SIGN_UP_URL, data);
}
