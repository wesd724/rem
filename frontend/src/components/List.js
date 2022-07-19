import React from "react";
import { Link } from "react-router-dom";
import { addViews } from "../lib/api";
import "./css/List.css";

const List = ({ lists }) => {
    return (
        <>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITlE</th>
                        <th>TEXT</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((value, index) =>
                        <tr key={value._id}>
                            <td>{value.id}</td>
                            <td>{value.title}</td>
                            <td>{value.text}</td>
                            <td><Link to={{
                                pathname: `/view/${index + 1}`,
                                state: {
                                    _id: value._id,
                                    id: value.id,
                                    title: value.title,
                                    text: value.text,
                                    view: value.view
                                }
                            }}><button className="detail-button" onClick={() => addViews({ _id: value._id })}>DETAIL</button></Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default React.memo(List);
