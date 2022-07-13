import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { updateData, readData, addViews } from "../lib/api";
import { userContext } from "../store/context";
import "./css/List.css";

const List = ({ lists, setList }) => {
    const { page } = useContext(userContext);
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
            readData(page).then(res => setList([...res.data.result]));
        }
    }, [setList, page]);

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
                                    text: value.text,
                                    view: value.view
                                }
                            }}><button onClick={() => addViews({ _id: value._id })}>DETAIL</button></Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default React.memo(List);
