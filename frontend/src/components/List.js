import axios from "axios";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./css/List.css";

const updateData = data => {
    return axios.put(process.env.REACT_APP_URL, data);
}

const deleteData = id => {
    return axios.delete(process.env.REACT_APP_URL, {
        data: {
            _id: id
        }
    });
}

const List = ({ lists, setList }) => {
    const update = useCallback(async (e, id) => {
        const currentElement = e.target;
        const textElement = e.target.parentNode.previousSibling.previousSibling;
        const beforeText = textElement.textContent;
        if (currentElement.textContent === 'UPDATE') {
            currentElement.textContent = 'FINISH';
            textElement.innerHTML = `<textarea>${beforeText}</textarea>`;
        } else {
            currentElement.textContent = 'UPDATE';
            const changeText = {
                _id: id,
                text: textElement.children[0].value
            }
            await updateData(changeText);
            textElement.innerHTML = `${changeText.text}`;
        }
    }, []);

    const deleted = useCallback(async (id) => {
        await deleteData(id);
        setList(lists => lists.filter(value => value._id !== id));
    }, [setList]);

    return (
        <>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TEXT</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((value, index) =>
                        <tr key={value._id}>
                            <td>{value.id}</td>
                            <td>{value.text}</td>
                            <td><button onClick={() => deleted(value._id)}>DELETE</button></td>
                            <td><button onClick={e => update(e, value._id)}>UPDATE</button></td>
                            <td><Link to={{
                                pathname: `/view/${index + 1}`,
                                state: {
                                    id: value.id,
                                    text: value.text
                                }
                            }}><button>DETAIL</button></Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default List;
