import React from 'react';
import Title from '../src/components/title';
import Form from '../src/components/forms';
import Weather from '../src/components/weather';
import './App.css';

const Api_Key ="0ce3c2d7caab1d57bfc4a187850caa8b";

class App extends React.Component{

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }


    getWeather = async (e) => {
        e.preventDefault ();
        const city=e.target.elements.city.value;
        const country=e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`);
        const response = await api_call.json();
        console.log(response);
        if(city) {
            this.setState({
                temperature: response.main.temp,
                city: response.name,
                country: response.sys.country,
                humidity: response.main.humidity,
                description: response.weather[0].description,
                error: ""
            })
        }
        else{
            this.setState({
                error : "Введите Город и Страну"
            })
        }
    }

    render() {
      return(
          <div>
              <div className="wrapper">
                  <div className="main">
                      <div className="container">
                          <div className="row">
                              <div className="col-xs-5 title-container">
                                  <Title />
                              </div>
                              <div className="col-xs-7 form-container">
                                  <Form loadWeather={this.getWeather} />
                                  <Weather
                                      temperature={this.state.temperature}
                                      city={this.state.city}
                                      country={this.state.country}
                                      humidity={this.state.humidity}
                                      description={this.state.description}
                                      error={this.state.error}
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )




    }
}

export default App;
