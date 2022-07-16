import axios from "axios";
import React, { useEffect, useState } from "react";
import cities from "../data/cities.json";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import sky from "../images/sky.jpeg";

const Dashboard = () => {
  const [weather1, setWeather1] = useState([]);
  const [weather2, setWeather2] = useState([]);
  const [weather3, setWeather3] = useState([]);
  const [weather4, setWeather4] = useState([]);
  const [weather5, setWeather5] = useState([]);
  const [weather6, setWeather6] = useState([]);
  const [weather7, setWeather7] = useState([]);
  const [weather8, setWeather8] = useState([]);
  const city = JSON.parse(JSON.stringify(cities.List));
  console.log(city);

  let code = city.map((city) => {
    return {
      CityCode: city.CityCode,
    };
  });
  console.log(code);

  useEffect(() => {
    const getWeather = () => {
      for (let i = 0; i < code.length; i++) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?id=${code[i].CityCode}&units=metric&appid=4197ebf57e26058102230bc91094fc23`
          )
          .then((res) => {
            switch (i) {
              case 0:
                setWeather1(res.data);
                break;
              case 1:
                setWeather2(res.data);
                break;
              case 2:
                setWeather3(res.data);
                break;
              case 3:
                setWeather4(res.data);
                break;
              case 4:
                setWeather5(res.data);
                break;
              case 5:
                setWeather6(res.data);
                break;
              case 6:
                setWeather7(res.data);
                break;
              case 7:
                setWeather8(res.data);
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getWeather();
  }, []);

  const weather = [
    weather1,
    weather2,
    weather3,
    weather4,
    weather5,
    weather6,
    weather7,
    weather8,
  ];

  console.log(weather);
  return (
    <>
      <div
        style={{
          backgroundImage: `url("https://wallpapercave.com/wp/7rhrsIf.jpg")`,
          height: "120vh",
          backgroundSize: "cover",
        }}
      >
        <br />
        <center>
          <h2 style={{ color: "white" }}>Weather App</h2>
        </center>
        <br />
        <center>
          <div
            style={{
              display: "flex",
              justifyContent: "spacebetween",
              width: "20%",
              height: "30px",
              verticalAlign: "middle",
            }}
          >
            <input
              style={{
                border: "none",
                flex: 5,
                paddingLeft: "20px",
                backgroundColor: "black",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="Enter a city"
            />
            <button
              style={{
                backgroundColor: "violet",
                border: "none",
                flex: 2,
                color: "white",
                borderRadius: "4px",
                minWidth: "max-content",
              }}
            >
              Add City
            </button>
          </div>
          <br />
          <Row xs={1} md={3} className="g-4">
            {weather.map((weathers) => {
              return (
                <div>
                  {Array.from({ length: 1 }).map((_, idx) => (
                    <Col>
                      <Card
                        bg="secondary"
                        style={{
                          width: "30rem",
                          height: "13rem",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={weathers.id}
                      >
                        <Card.Img
                          variant="top"
                          style={{ height: "10vh" }}
                          src={sky}
                        />
                        <Card.Title>{weathers.name}</Card.Title>
                        {weathers.weather ? (
                          <h6>{weathers.weather[0].description}</h6>
                        ) : null}

                        {weathers.main ? (
                          <p>Temperature: {weathers.main.temp} &deg;C</p>
                        ) : null}
                        <p>
                          City ID:{weathers.id}{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          Update’s timespan:{weathers.dt}
                        </p>
                      </Card>
                    </Col>
                  ))}
                </div>
              );
            })}
          </Row>
        </center>
      </div>
    </>
  );
};

export default Dashboard;
