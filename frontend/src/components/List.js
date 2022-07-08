import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { updateData, readData } from "../lib/api";
import "./css/List.css";

const List = ({ lists, setList }) => {
    const update = useCallback(async (e, id) => {
        const currentElement = e.target;
        const textElement = e.target.parentNode.previousSibling;
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
            readData().then(res => setList([...res.data]));
        }
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
                            <td><button onClick={e => update(e, value._id)}>UPDATE</button></td>
                            <td><Link to={{
                                pathname: `/view/${index + 1}`,
                                state: {
                                    _id: value._id,
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
