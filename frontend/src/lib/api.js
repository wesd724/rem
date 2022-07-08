import axios from "axios";

export const createData = data => {
    return axios.post(process.env.REACT_APP_URL, data);
}

export const readData = () => {
    return axios.get(process.env.REACT_APP_URL);
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
