import React, { useState, useEffect } from "react";
import Clock from "./components/Clock";
import { Avatar, Select, Button, message } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import "./App.scss";

function App() {
  const [clocks, setClocks] = useState<number[]>([]);
  const [UCT, setUCT] = useState("");
  const cities = [
    {
      value: "UTC+00:00",
      label: "Luân Đôn, Vương quốc Anh",
    },
    {
      value: "UTC+01:00",
      label: "Paris, Pháp",
    },
    {
      value: "UTC+02:00",
      label: "Berlin, Đức",
    },
    {
      value: "UTC+03:00",
      label: "Moskva, Nga",
    },
    {
      value: "UTC+04:00",
      label: "Thượng Hải, Trung Quốc",
    },
    {
      value: "UTC+05:00",
      label: "New Delhi, Ấn Độ",
    },
    {
      value: "UTC+06:00",
      label: "Bangkok, Thái Lan",
    },
    {
      value: "UTC+07:00",
      label: "Hà Nội, Việt Nam",
    },
    {
      value: "UTC+08:00",
      label: "Bắc Kinh, Trung Quốc",
    },
    {
      value: "UTC+09:00",
      label: "Tokyo, Nhật Bản",
    },
    {
      value: "UTC+10:00",
      label: "Sydney, Úc",
    },
    {
      value: "UTC+11:00",
      label: "Thái Bình Dương, New Zealand",
    },
    {
      value: "UTC+12:00",
      label: "Auckland, New Zealand",
    },
    {
      value: "UTC-01:00",
      label: "Lisbon, Bồ Đào Nha",
    },
    {
      value: "UTC-02:00",
      label: "Buenos Aires, Argentina",
    },
    {
      value: "UTC-03:00",
      label: "Rio de Janeiro, Brazil",
    },
    {
      value: "UTC-04:00",
      label: "New York, Hoa Kỳ",
    },
    {
      value: "UTC-05:00",
      label: "Chicago, Hoa Kỳ",
    },
    {
      value: "UTC-06:00",
      label: "Mexico City, Mexico",
    },
    {
      value: "UTC-07:00",
      label: "Los Angeles, Hoa Kỳ",
    },
    {
      value: "UTC-08:00",
      label: "Vancouver, Canada",
    },
    {
      value: "UTC-09:00",
      label: "Honolulu, Hoa Kỳ",
    },
    {
      value: "UTC-10:00",
      label: "Sydney, Úc",
    },
    {
      value: "UTC-11:00",
      label: "Fiji",
    },
    {
      value: "UTC-12:00",
      label: "Auckland, New Zealand",
    },
  ];

  const getClocks = () => {
    const clocks = JSON.parse(localStorage.getItem("clocks") || "[]");
    if (clocks.length > 0) {
      setClocks(clocks);
    } else {
      let date = new Date();
      let GMT = +date
        .toString()
        .split("GMT")[1]
        .split(" ")[0]
        .replaceAll("0", "");
      localStorage.setItem("clocks", JSON.stringify([GMT]));
      setClocks([GMT]);
    }
  };

  const addClock = (UCT: string) => {
    if (clocks.includes(+UCT.split("UTC")[1].split(":")[0])) {
      return message.error("This clock already exists");
    }
    if (UCT === "") return;
    const clock = +UCT.split("UTC")[1].split(":")[0];
    const newClocks = [...clocks, clock];
    localStorage.setItem("clocks", JSON.stringify(newClocks));
    setClocks(newClocks);
  };

  const removeClock = (UCT: number) => {
    const clock = localStorage.getItem("clocks");
    if (clock) {
      const newClock = JSON.parse(clock).filter((item: number) => item !== UCT);
      localStorage.setItem("clocks", JSON.stringify(newClock));
      setClocks(newClock);
    }
  };

  useEffect(() => {
    getClocks();
  }, []);

  return (
    <>
      <header>
        <Avatar
          icon={<ClockCircleFilled />}
          style={{ backgroundColor: "var(--first-color)" }}
        />
        <h1>World Clock.</h1>
      </header>
      <main>
        <div className="search-location">
          <Select
            showSearch
            style={{ width: "100%", height: "3rem", marginRight: "1rem" }}
            placeholder="Search location"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                  input
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                )
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={cities}
            onChange={(value) => setUCT(value)}
          />
          <Button
            type="primary"
            className="search-location__add"
            onClick={() => addClock(UCT)}
          >
            Add
          </Button>
        </div>
        <div className="clocks">
          {clocks.map((clock, index) => (
            <Clock
              key={index}
              UCT={clock}
              removeClock={() => removeClock(clock)}
            />
          ))}
        </div>
      </main>
      {/* <footer>
        <p>
          Created by <a href="/">@minh0812</a>
        </p>
      </footer> */}
    </>
  );
}

export default App;
