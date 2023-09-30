import React, { useState, useEffect } from "react";
import Clock from "./components/Clock";
import { Avatar, Select, Button, message, Tooltip } from "antd";
import { ClockCircleFilled, PlusOutlined } from "@ant-design/icons";
import city from "./city.json";
import "./App.scss";

function App() {
  const [clocks, setClocks] = useState<{ GMT: string; location: string }[]>([]);
  const [GMT, setGMT] = useState<{ GMT: string; location: string }>();
  const [theme, setTheme] = useState("light");
  const cities = city;

  const getClocks = () => {
    const clocks = JSON.parse(localStorage.getItem("clocks") || "[]");
    if (clocks.length > 0) {
      setClocks(clocks);
    } else {
      setClocks([{ GMT: "", location: "Current" }]);
      localStorage.setItem("clocks", JSON.stringify(clocks));
    }
  };

  const addClock = (GMT: string, location: string) => {
    if (clocks.find((item) => item.location === location)) {
      return message.error("This clock already exists");
    }
    if (GMT === "") return;
    const newClocks = [...clocks, { GMT, location }];
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
            <Tooltip
              title="Light/Dark theme"
              color="var(--first-color)"
              placement="left"
            >
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
            style={{ width: "100%", height: "3rem", background: "back" }}
            placeholder="Search country, city or GMT"
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
              setGMT({
                GMT: value?.split(" ").slice(-1)[0],
                location: value?.split("|")[0],
              })
            }
            options={cities.map((city) => ({
              value: city.value,
              label: city.value,
            }))}
          />
          <Tooltip color="var(--first-color)" title="Add clock" placement="top">
            <Button
              type="primary"
              className="search-location__add"
              disabled={GMT === undefined}
              onClick={() => {
                addClock(GMT?.GMT as string, GMT?.location as string);
                console.log(GMT);
              }}
            >
              <PlusOutlined />
            </Button>
          </Tooltip>
        </div>
        <div className="clocks">
          {clocks.map((clock, index) => (
            <Clock
              key={index}
              GMT={clock.GMT}
              location={clock.location}
              removeClock={() => removeClock(clock.location)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
