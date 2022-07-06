import axios from "axios";
import React, { useCallback } from "react";



const List = ({ lists, setList, readData }) => {
    const del = useCallback(async (id) => {
        await axios.delete(process.env.REACT_APP_DELETE_URL, {
            data: {
                _id: id
            }
        })
        //readData().then(res => setList([...res.data]));
        setList(lists => lists.filter(value => value._id !== id));
    }, [setList]);

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TEXT</th>
                </tr>
            </thead>
            <tbody>
                {lists.map((value) =>
                    <tr key={value._id}>
                        <td>{value.id}</td>
                        <td>{value.text}</td>
                        <td><button onClick={() => del(value._id)}>DEL</button></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default List;