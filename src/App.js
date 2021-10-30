import { Card, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Table from "./Table";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    try {
      const getCountries = () => {
        fetch("https://disease.sh/v3/covid-19/countries")
          .then((res) => res.json())
          .then((data) => {
            setCountries(data);
            setTableData(data);
          });
      };
      getCountries();
    } catch {}
  }, []);

  console.log(countryInfo);

  return (
    <div className="container d-flex justify-content-between align-items-start">
      <div className="container-fluid">
        <div className="header d-flex justify-content-between align-items-center mt-4">
          <h2>Covid - 19 Tracker</h2>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value={country}> Worldwide </MenuItem>

              {countries.map((country) => (
                <MenuItem
                  key={country.country}
                  value={country.countryInfo.iso2}
                >
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="main">
          <div className="d-flex justify-content-between align-items-center mt-3">
            <InfoBox
              title={"Coronovirus cases"}
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <InfoBox
              title={"Recovered cases"}
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <InfoBox
              title={"Coronovirus cases"}
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </div>
          <div className="map">i am map</div>
        </div>
      </div>
      <div
        className="live mt-4 mr-3"
        style={{ flexBasis: "50%", marginLeft: "2rem" }}
      >
        <Card style={{ width: "100%" }}>
          <h3 className="mb-3 p-3">Live cases</h3>
          <div className="table">
            <Table countries={tableData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
