import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class WeatherForecast extends Component {
  state = {
    forecastData: {},
    isLoading: false,
    city: '',
    expandedDay: null
  };

  fetchRandomDayForecast = (city, day) => {
    this.setState({ isLoading: true });

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e638f3c26fbbbce615bdb74062a91c76&units=metric`)
      .then(res => {
        console.log(res.data);
        const forecastList = res.data.list;
        const dayData = this.extractDayForecast(forecastList, day);
        this.setState(prevState => ({
          forecastData: {
            ...prevState.forecastData,
            [day]: dayData
          },
          isLoading: false
        }));
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  extractDayForecast = (forecastList, day) => {
    const dayData = [];

    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const forecastDay = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (forecastDay === day) {
        dayData.push({
          temperature: item.main.temp,
          weather: item.weather[0].main,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          icon: item.weather[0].icon 
        });
      }
    });

    const shuffledData = this.shuffle(dayData);
    return shuffledData.length > 0 ? [shuffledData[0]] : [];
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { city } = this.state;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => this.fetchRandomDayForecast(city, day));
  };

  toggleDayDetails = (day) => {
    this.setState(prevState => ({
      expandedDay: prevState.expandedDay === day ? null : day
    }));
  };

  render() {
    const { forecastData, isLoading, city, expandedDay } = this.state;

    return (
      <div className="container mt-5" style={{ backgroundColor: 'skyblue', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Weather Forecast</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="cityInput">Enter City:</label>
            <input
              type="text"
              className="form-control"
              id="cityInput"
              value={city}
              onChange={(event) => this.setState({ city: event.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Get Forecast
          </button>
        </form>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Weather</th>
                  <th>Temperature (°C)</th>
                  <th>Icon</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(forecastData).map(day => (
                  <React.Fragment key={day}>
                    <tr onClick={() => this.toggleDayDetails(day)}>
                      <td>{day}</td>
                      {forecastData[day].map((item, index) => (
                        <React.Fragment key={index}>
                          <td>{item.weather}</td>
                          <td>{item.temperature}</td>
                          <td>
                            <img src={this.getWeatherIconUrl(item.icon)} alt="Weather Icon" />
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                    {expandedDay === day && forecastData[day].length > 0 && (
                      <tr>
                        <td colSpan="4">
                          <div>
                            <strong>Description:</strong> {forecastData[day][0].description}
                            <br />
                            <strong>Humidity:</strong> {forecastData[day][0].humidity}%
                            <br />
                            <strong>Wind Speed:</strong> {forecastData[day][0].windSpeed} m/s
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedDay === day && forecastData[day].length === 0 && (
                      <tr>
                        <td colSpan="4">No additional information to display.</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherForecast;