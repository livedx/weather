import React from "react";
import Info from "./components/Info"
import Form from "./components/Form"
import Weather from "./components/Weather"
import axios from "axios"
import lodash from "lodash"

const API_KEY = "c8b2dd052b3a91e2f5304f03cb051540";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (ev) => {

        ev.preventDefault();
        let city = ev.target.elements.city.value;


        if (!!city === true) {
            console.log('start fecth');
            const api_url = await

                axios({
                    method: 'get',
                    url: `/data/2.5/weather?q=${city}&appid=${API_KEY}/api.json`, proxy: {
                        host: `https://samples.openweathermap.org`,
                    },responseType:'json'


                });
            const result = api_url
            console.log(api_url);


            let sunset = result.data.sys.sunset;
            sunset = lodash.get(result, "data.sys.sunset", null)
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.setState({
                temp: result.data.main.temp,
                city: result.data.name,
                country: result.data.sys.country,
                sunrise: result.data.sys.sunrise,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Введите название города"
            });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMetod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;