import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import { Sunrise, Sunset } from 'react-feather';

class SunriseSunsetTimes extends Component {

    constructor(props) {
        super();
        this.state = {
            astronomy: [],
            isData: false
        };
    }

    getDataFromAPI = async (event) => {
        event.preventDefault() // don't redirect the page
        const API_KEY = '158049d7fad44187a70cfa196fe53dd7';
        const location = event.target.name.value;
        const res = await fetch(
            `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&location=${location}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                method: 'GET'
            }
        )

        const result = await res.json();
        if (result) {
            this.setState({ astronomy: result, isData: true });
            console.log(this.state.astronomy.length);
        }
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Suninfo</title>
                </Head>

                <div className="container ss-wrapper">
                    <h3>Sunrise and Sunset time by location</h3>
                    <form onSubmit={this.getDataFromAPI}>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label className="col-form-label">Enter Location</label>
                            </div>
                            <div className="col-auto">
                                <input id="name" name="name" type="text" placeholder="Ex. New York" className="form-control" required />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-success">Register</button>
                            </div>
                        </div>
                    </form>

                    {this.state.isData ?
                        <div className="row data-wrapper">

                            <div className="col">
                                <div className="card">
                                    <Sunrise color="orange" className="card-img-top" size={90} />
                                    <div className="card-body">
                                        <div className="card-text">
                                            <p>Sunrise: <b>{this.state.astronomy.sunrise}</b></p>
                                            <p>Current Time: <b>{this.state.astronomy.current_time}</b></p>
                                            <p>Date: <b>{this.state.astronomy.date}</b></p>
                                            <p>Day Length: <b>{this.state.astronomy.day_length}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card">

                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th>Country</th>
                                                <td>{this.state.astronomy.location.country}</td>
                                            </tr>
                                            <tr>
                                                <th>State</th>
                                                <td>{this.state.astronomy.location.state}</td>
                                            </tr>
                                            <tr>
                                                <th>Latitude</th>
                                                <td>{this.state.astronomy.location.latitude}</td>
                                            </tr>
                                            <tr>
                                                <th>Longitude</th>
                                                <td>{this.state.astronomy.location.longitude}</td>
                                            </tr>
                                            <tr>
                                                <th>Moonrise</th>
                                                <td>{this.state.astronomy.moonrise}</td>
                                            </tr>
                                            <tr>
                                                <th>Moonset</th>
                                                <td>{this.state.astronomy.moonset}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card">
                                    <Sunset color="#aaa" className="card-img-top" size={90} />
                                    <div className="card-body">
                                        <div className="card-text">
                                            <p>Sunset: <b>{this.state.astronomy.sunset}</b></p>
                                            <p>Current Time: <b>{this.state.astronomy.current_time}</b></p>
                                            <p>Date: <b>{this.state.astronomy.date}</b></p>
                                            <p>Day Length: <b>{this.state.astronomy.day_length}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ""}

                </div>

            </Layout>
        )
    }
}

export default SunriseSunsetTimes;