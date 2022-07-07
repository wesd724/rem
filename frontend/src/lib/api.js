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
