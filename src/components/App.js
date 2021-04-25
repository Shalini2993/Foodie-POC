import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import RestaurantsComponent from './RestaurantsComponent';
import getUserDetailsApi from '../apis/establishmentsApi';
import RestaurantInformation from './RestaurantInformation';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cityId: null,
            establishments: [],
            cityName: "",
            restaurantId: null,
            restoData: []
        }
    }

    getEstablishments = async () => {
        const { cityId } = this.state;
        try {
            const userData = await getUserDetailsApi.get("/establishments", {
                params: {
                    city_id: cityId
                }
            });
            if (userData.code && userData.code !== 200) throw new Error();
            this.setState({ establishments: userData.data.establishments });
        } catch (error) {
            alert("Services not available for this city");
        }
    }

    handleCityInput = ({ target }) => {
        const { value } = target;
        const cityName = value.split(' ').join('');
        this.setState({ cityName })
    }

    getCityId = async (event) => {
        event.preventDefault();
        const { cityName } = this.state;
        const response = await getUserDetailsApi.get("/cities", {
            params: {
                q: cityName
            }
        });
        const cityId = response.data.location_suggestions[0]?.id ?? undefined;
        this.setState({ cityId }, () => {
            this.getEstablishments();
        })
    }

    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            this.getCityId();
        }
    }

    getRestaurantDetails = async ({ id, name }) => {
        try {
            const restaurantInfo = await getUserDetailsApi.get("/search", {
                params: {
                    establishment_id: id
                }
            });
            if (restaurantInfo.status && restaurantInfo.status !== 200) throw new Error();
            this.setState({ restoData: restaurantInfo.data.restaurants, establishmentName: name });
        } catch (error) {
            alert("Restaurants not found for this establishment.");
        }
    }

    renderEstablishments = () => {
        const { establishments = [] } = this.state;
        const estNames = establishments.map(({ establishment }) => {
            return (
                <Link to='/restaurants'>
                    <span id="types" className="ui compact segment" onClick={() => { this.getRestaurantDetails(establishment) }}>
                        <p>{establishment.name}</p>
                    </span >
                </Link>
            );
        });
        return estNames;
    }

    openRestaurantDetail = (id) => {
        this.setState({ restaurantId: id });
    }

    render() {
        const { restoData, establishmentName, restaurantId, cityName } = this.state;
        if (isEmpty(restoData) && window.location.pathname.includes('/restaurants')) {
            window.location.pathname = "/"
        }
        if (isEmpty(restoData) && window.location.pathname.includes('/restaurants/details')) {
            window.location.pathname = "/restaurants"
        }
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path='/' exact render={() =>
                            <div className="bg-img">
                                <div className="container">
                                    <div className="home"><div className="welcome">Welcome to Foodie!!</div>Find your favourite restaurants and cuisines nearby.</div>
                                    <form>
                                        <div className="ui search">
                                            <div className="ui icon input searchInput">
                                                <input onKeyPress={this.handleKeyPress} className="prompt" type="text" placeholder="Enter your city..." onChange={this.handleCityInput} value={cityName} />
                                                <i className="search icon"></i>
                                            </div>
                                            <button id="btn" type="submit" className="ui primary button" onClick={this.getCityId}>Search</button>
                                            <div className="results"></div>
                                        </div>
                                    </form>
                                    <div className="establishment">{this.renderEstablishments()}</div>
                                </div>
                            </div>
                        } />
                        <Route path='/restaurants' exact>
                            {restoData && <RestaurantsComponent restoData={restoData} establishmentName={establishmentName} openRestaurantDetail={this.openRestaurantDetail} />}
                        </Route>
                        <Route path='/restaurants/details' exact>
                            {restoData && <RestaurantInformation restoData={restoData} restoId={restaurantId} />}
                        </Route>
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

export default App;
