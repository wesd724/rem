import React from "react";
import "./css/view.css"

const View = ({ location, match, history }) => {
    const { id, text } = location.state;
    const { number: n } = match.params;
    return (
        <div className="view">
            <div>
                <span>
                    post {n}
                </span>
                <hr className="view-boundary" />
                <p>
                    {id}
                </p>
            </div>
            <hr className="view-boundary" />
            <div>
                <span>
                    {text}
                </span>
            </div>
            <button onClick={() => history.goBack()}>BACK</button>
        </div>
    )
}

export default View;
