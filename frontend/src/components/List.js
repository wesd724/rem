import React from "react";

const List = ({ lists }) => {
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
                    </tr>
                )}
            </tbody>
        </table>
    )
}


export default List;