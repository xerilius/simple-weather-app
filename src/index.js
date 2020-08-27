import './index.css';
import React from 'react';
import ReactDOM, { render } from 'react-dom';

import weather from 'weather-gov-api';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            lat: null, 
            lon: null,
            forecast: '',
            degree: null,
            sfLat: 37.7749,
            sfLon: -122.4194,
            icon: '',
        };
    }
    
    componentDidMount() {
        // Geolocation API
        window.navigator.geolocation.getCurrentPosition(
            position => { 
                this.setState({ 
                lat: position.coords.latitude,
                lon: position.coords.longitude
                });
            
            const data = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }

            // Weather API
            weather.getForecast('default', data.lat, data.lon)
            .then(data => { this.setState({
                degree: data.data.properties.periods[0].temperature,
                icon: data.data.properties.periods[0].icon
                }) 
            })
            .catch(err => console.log(err));
            })
    }
         
    render() {
       return(
           <div>
               <h1>Simple Weather App</h1>
              
                <div className="location">
                <h3>Pick Location</h3>
                <div className="latlon">
                <div className="lat" ><span style={{fontSize: 10, color:"gray"}}>Lat</span>
                    <div style={{color: "lightblue", fontWeight: 700}}>{this.state.lat}</div>
                </div>

                <div className="lon" ><span style={{fontSize: 10, color:"gray"}}>Long</span>
                    <div style={{color: "lightblue", fontWeight: 700}}>{this.state.lon}</div>
                </div>
                </div>
                </div>

                <div>
                <h3>Weather</h3>
                    <span className="temp">{this.state.degree}°</span>
                    <img src={this.state.icon} />
                </div>

           </div>
       );

    }
};

ReactDOM.render(<App />, document.querySelector('#root'));

