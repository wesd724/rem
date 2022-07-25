import React, { useCallback, useEffect, useState } from "react";
import "./css/recommend.css";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { readRecommend, recommend } from "../lib/api";

const Recommend = ({ _id }) => {
    const [goodPoint, setGoodPoint] = useState(0);
    const [goodFlag, setGoodFlag] = useState(true);

    const [badPoint, setBadPoint] = useState(0);
    const [badFlag, setBadFlag] = useState(true);

    useEffect(() => {
        readRecommend({ _id }).then(res => {
            setGoodPoint(res.data.good);
            setBadPoint(res.data.bad);
        });
    }, [_id]);

    const increaseGoodPoint = useCallback(() => {
        if (goodFlag) {
            recommend({ _id, recommend: "good" });
            setGoodPoint(good => good + 1);
            setGoodFlag(false);
        }
    }, [_id, goodFlag]);

    const increaseBadPoint = useCallback(() => {
        if (badFlag) {
            recommend({ _id, recommend: "bad" });
            setBadPoint(bad => bad + 1);
            setBadFlag(false);
        }
    }, [_id, badFlag]);

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
