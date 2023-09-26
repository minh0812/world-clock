import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./Clock.scss";

const Clock: React.FC<{
  UCT?: number;
  removeClock: (UCT: number) => void;
}> = ({ UCT, removeClock }) => {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [amPm, setAmPm] = useState("AM");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState(1);

  const getTime = (date: Date) => {
    setHour(date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
    setMinutes(date.getMinutes());
    setSeconds(date.getSeconds());
    setAmPm(date.getHours() >= 12 ? "PM" : "AM");
    setDay(date.getDate());
    setMonth(date.toLocaleString("en-US", { month: "short" }));
    setYear(date.getFullYear());
  };

  useEffect(() => {
    if (!UCT) {
      const interval = setInterval(() => {
        const date = new Date();
        getTime(date);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        const date = new Date();
        const GMT = date.getTime() + date.getTimezoneOffset() * 60000;
        const newDate = new Date(GMT + 3600000 * UCT);
        getTime(newDate);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [UCT]);

  return (
    <div className="clock">
      <Tooltip title="Remove clock" placement="top">
        <CloseCircleOutlined
          className="icon-close"
          onClick={() => removeClock(UCT as number)}
        />
      </Tooltip>
      <div className="clock__circle">
        <span className="clock__twelve"></span>
        <span className="clock__three"></span>
        <span className="clock__six"></span>
        <span className="clock__nine"></span>

        <div className="clock__rounder"></div>
        <div
          className="clock__hour"
          style={{ transform: `rotate(${hour * 30}deg)` }}
        ></div>
        <div
          className="clock__minutes"
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        ></div>
        <div
          className="clock__seconds"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        ></div>
      </div>

      <div>
        <div className="clock__text">
          <div className="clock__text-hour" id="text-hour">
            {hour >= 10 ? hour : `0${hour}`}:
          </div>
          <div className="clock__text-minutes" id="text-minutes">
            {minutes >= 10 ? minutes : `0${minutes}`}:
          </div>
          <div className="clock__text-seconds" id="text-seconds">
            {seconds >= 10 ? seconds : `0${seconds}`}
          </div>
          <div className="clock__text-ampm" id="text-ampm">
            {amPm}
          </div>
        </div>

        <div className="clock__date">
          <span id="date-day">{day >= 10 ? day : `0${day}`}</span>
          <span id="date-month">{month}</span>
          <span id="date-year">{year >= 10 ? year : `0${year}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
