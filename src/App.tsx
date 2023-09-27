import React, { useState, useEffect } from "react";
import Clock from "./components/Clock";
import { Avatar, Select, Button, message, Tooltip } from "antd";
import { ClockCircleFilled, PlusOutlined } from "@ant-design/icons";
import "./App.scss";

function App() {
  const [clocks, setClocks] = useState<{ UCT: string; location: string }[]>([]);
  const [UCT, setUCT] = useState<{ UCT: string; location: string }>();
  const [theme, setTheme] = useState("light");
  const cities = [
    {
      value: {
        UCT: "+00:00",
        location: "Luân Đôn, Vương quốc Anh",
      },
      label: "Luân Đôn, Vương quốc Anh",
    },
    {
      value: {
        UCT: "+01:00",
        location: "Paris, Pháp",
      },
      label: "Paris, Pháp",
    },
    {
      value: {
        UCT: "+02:00",
        location: "Berlin, Đức",
      },
      label: "Berlin, Đức",
    },
    {
      value: {
        UCT: "+03:00",
        location: "Moskva, Nga",
      },
      label: "Moskva, Nga",
    },
    {
      value: {
        UCT: "+04:00",
        location: "Thượng Hải, Trung Quốc",
      },
      label: "Thượng Hải, Trung Quốc",
    },
    {
      value: {
        UCT: "+05:00",
        location: "New Delhi, Ấn Độ",
      },
      label: "New Delhi, Ấn Độ",
    },
    {
      value: {
        UCT: "+06:00",
        location: "Bangkok, Thái Lan",
      },
      label: "Bangkok, Thái Lan",
    },
    {
      value: {
        UCT: "+07:00",
        location: "Hà Nội, Việt Nam",
      },
      label: "Hà Nội, Việt Nam",
    },
    {
      value: {
        UCT: "+08:00",
        location: "Bắc Kinh, Trung Quốc",
      },
      label: "Bắc Kinh, Trung Quốc",
    },
    {
      value: {
        UCT: "+09:00",
        location: "Tokyo, Nhật Bản",
      },
      label: "Tokyo, Nhật Bản",
    },
    {
      value: {
        UCT: "+10:00",
        location: "Sydney, Úc",
      },
      label: "Sydney, Úc",
    },
    {
      value: {
        UCT: "+11:00",
        location: "Thái Bình Dương, New Zealand",
      },
      label: "Thái Bình Dương, New Zealand",
    },
    {
      value: {
        UCT: "+12:00",
        location: "Auckland, New Zealand",
      },
      label: "Auckland, New Zealand",
    },
    {
      value: {
        UCT: "-01:00",
        location: "Lisbon, Bồ Đào Nha",
      },
      label: "Lisbon, Bồ Đào Nha",
    },
    {
      value: {
        UCT: "-02:00",
        location: "Rio de Janeiro, Brazil",
      },
      label: "Buenos Aires, Argentina",
    },
    {
      value: {
        UCT: "-03:00",
        location: "Rio de Janeiro, Brazil",
      },
      label: "Rio de Janeiro, Brazil",
    },
    {
      value: {
        UCT: "-04:00",
        location: "New York, Hoa Kỳ",
      },
      label: "New York, Hoa Kỳ",
    },
    {
      value: {
        UCT: "-05:00",
        location: "Chicago, Hoa Kỳ",
      },
      label: "Chicago, Hoa Kỳ",
    },
    {
      value: {
        UCT: "-06:00",
        location: "Mexico City, Mexico",
      },
      label: "Mexico City, Mexico",
    },
    {
      value: {
        UCT: "-07:00",
        location: "Los Angeles, Hoa Kỳ",
      },
      label: "Los Angeles, Hoa Kỳ",
    },
    {
      value: {
        UCT: "-08:00",
        location: "Vancouver, Canada",
      },
      label: "Vancouver, Canada",
    },
    {
      value: {
        UCT: "-09:00",
        location: "Honolulu, Hoa Kỳ",
      },
      label: "Honolulu, Hoa Kỳ",
    },
    {
      value: {
        UCT: "-10:00",
        location: "Sydney, Úc",
      },
      label: "Sydney, Úc",
    },
    {
      value: {
        UCT: "-11:00",
        location: "Fiji",
      },
      label: "Fiji",
    },
    {
      value: {
        UCT: "-12:00",
        location: "Auckland, New Zealand",
      },
      label: "Auckland, New Zealand",
    },
  ];

  const getClocks = () => {
    const clocks = JSON.parse(localStorage.getItem("clocks") || "[]");
    if (clocks.length > 0) {
      setClocks(clocks);
    } else {
      let date = new Date();
      let GMT = date.toString().split("GMT")[1].split(" ")[0];
      GMT = GMT.slice(0, 3) + ":" + GMT.slice(3);

      localStorage.setItem(
        "clocks",
        JSON.stringify([{ UCT: GMT, location: "Current" }])
      );
      setClocks([{ UCT: GMT, location: "Current" }]);
    }
  };

  const addClock = (UCT: string, location: string) => {
    if (clocks.find((item) => item.location === location)) {
      return message.error("This clock already exists");
    }
    if (UCT === "") return;
    const newClocks = [...clocks, { UCT, location }];
    localStorage.setItem("clocks", JSON.stringify(newClocks));
    setClocks(newClocks);
    return message.success("Add clock success");
  };

  const removeClock = (location: string) => {
    const newClocks = clocks.filter((clock) => clock.location !== location);
    localStorage.setItem("clocks", JSON.stringify(newClocks));
    setClocks(newClocks);
  };

  const getTheme = () => {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    isDarkTheme.addEventListener("change", () => {
      if (isDarkTheme.matches) {
        setTheme("dark");
        document.body.classList.add("dark-theme");
      } else {
        setTheme("light");
        document.body.classList.remove("dark-theme");
      }
    });
    if (isDarkTheme.matches) {
      setTheme("dark");
      document.body.classList.add("dark-theme");
    } else {
      setTheme("light");
      document.body.classList.remove("dark-theme");
    }
  };
  useEffect(() => {
    getClocks();
    getTheme();
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <Avatar
            icon={<ClockCircleFilled />}
            style={{ backgroundColor: "var(--first-color)" }}
          />
          <h1>World Clock.</h1>
        </div>
        <div className="theme">
          {
            <Tooltip title="Light/Dark theme" color="var(--first-color)" placement="left">
              {theme === "light" ? (
                <i
                  className="ri-sun-line"
                  onClick={() => {
                    setTheme("dark");
                    document.body.classList.add("dark-theme");
                  }}
                ></i>
              ) : (
                <i
                  className="ri-moon-line"
                  onClick={() => {
                    setTheme("light");
                    document.body.classList.remove("dark-theme");
                  }}
                ></i>
              )}
            </Tooltip>
          }
        </div>
      </header>
      <main>
        <div className="search-location">
          <Select
            showSearch
            style={{ width: "100%", height: "3rem", background: "back"}}
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
            onChange={(value) =>
              setUCT({
                UCT: value?.split(" ").slice(-1)[0],
                location: value?.split(" ").slice(0, -1).join(" "),
              })
            }
            options={cities.map((city) => ({
              value: city.value.location + " " + city.value.UCT,
              label: city.label + " " + city.value.UCT,
            }))}
          />
          <Tooltip color="var(--first-color)" title="Add clock" placement="top">
            <Button
              type="primary"
              className="search-location__add"
              disabled={UCT === undefined}
              onClick={() => addClock(UCT?.UCT ?? "", UCT?.location ?? "")}
            >
              <PlusOutlined />
            </Button>
          </Tooltip>
        </div>
        <div className="clocks">
          {clocks.map((clock, index) => (
            <Clock
              key={index}
              UCT={clock.UCT}
              location={clock.location}
              removeClock={() => removeClock(clock.location)}
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
