import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./Clock.scss";

const Clock: React.FC<{
  GMT?: string;
  location?: string;
  removeClock: (location: string) => void;
}> = ({ GMT, location, removeClock }) => {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [amPm, setAmPm] = useState("AM");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState(1);
  const [GMTLocal, setGMTLocal] = useState("");

  const getTime = (date: Date) => {
    setHour(date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
    setMinutes(date.getMinutes());
    setSeconds(date.getSeconds());
    setAmPm(date.getHours() >= 12 ? "PM" : "AM");
    setDay(date.getDate());
    setMonth(date.toLocaleString("en-US", { month: "short" }));
    setYear(date.getFullYear());
    setGMTLocal(
      date.toLocaleString("en-US", { timeZoneName: "short" }).split(" ")[3].replace("GMT", "GMT ")
    );
  };

  useEffect(() => {
    if (!GMT) {
      const interval = setInterval(() => {
        const date = new Date();
        getTime(date);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        const date = new Date();
        const UCT = date.getTime() + date.getTimezoneOffset() * 60000;
        const newDate = new Date(UCT + 3600000 * +GMT.replace(":", "."));
        getTime(newDate);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [GMT]);

  return (
    <div className="clock">
      <Tooltip color="var(--first-color)" title="Remove clock" placement="top">
        <CloseCircleOutlined
          className="icon-close"
          onClick={() => removeClock(location as string)}
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
          style={{ transform: `rotate(${hour * 30 + minutes * 0.5}deg)` }}
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
          <div className="clock__text-hour">
            {hour >= 10 ? hour : `0${hour}`}
          </div>
          <div className="clock__text-dot">:</div>
          <div className="clock__text-minutes">
            {minutes >= 10 ? minutes : `0${minutes}`}
          </div>
          <div className="clock__text-ampm">{amPm}</div>
        </div>

        <div className="clock__date">
          <span id="date-day">{day >= 10 ? day : `0${day}`}</span>
          <span id="date-month">{month}</span>
          <span id="date-year">{year >= 10 ? year : `0${year}`}</span>
        </div>
        <div className="clock__location">
          {location?.split("-")[1] ?? "Local time "}
          <span className="clock__location-gmt">
            {GMT ? `GMT ${GMT}` : GMTLocal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
