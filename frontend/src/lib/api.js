import axios from "axios";

export const createData = data => {
    return axios.post(process.env.REACT_APP_URL, data);
}

export const readData = n => {
    return axios.get(process.env.REACT_APP_URL + `/${n}`);
}

export const updateData = data => {
    return axios.put(process.env.REACT_APP_URL, data);
}

export const deleteData = id => {
    return axios.delete(process.env.REACT_APP_URL, {
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

export const recommend = data => {
    return axios.put(process.env.REACT_APP_RECOMMEND_URL, data);
}

export const readRecommend = data => {
    return axios.post(process.env.REACT_APP_READ_RECOMMEND_URL, data);
}
