import React, { useCallback, useEffect, useState } from "react";
import "./css/recommend.css";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { readRecommend, recommend } from "../lib/api";

const Recommend = ({ _id }) => {
    const [goodPoint, setGoodPoint] = useState(0);

    const [badPoint, setBadPoint] = useState(0);

    useEffect(() => {
        readRecommend({ _id }).then(res => {
            setGoodPoint(res.data.good);
            setBadPoint(res.data.bad);
        });
    }, [_id]);

    const increaseGoodPoint = useCallback(() => {
        recommend({ _id, recommend: "good" });
        setGoodPoint(good => good + 1);
    }, [_id]);

    const increaseBadPoint = useCallback(() => {
        recommend({ _id, recommend: "bad" });
        setBadPoint(bad => bad + 1);
    }, [_id]);

    return (
        <div className="good-bad">
            <div className="good">
                <IoMdThumbsUp onClick={increaseGoodPoint} />
                <div>
                    {goodPoint}
                </div>
            </div>
            <div className="bad">
                <IoMdThumbsDown onClick={increaseBadPoint} />
                <div>
                    {badPoint}
                </div>
            </div>
        </div>
    )
}

export default Recommend;
