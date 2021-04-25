import React from 'react';
import { Link } from 'react-router-dom';
import homeBackground from '../images/homeBackground.jpg';

class RestaurantsComponent extends React.Component {

    renderRestaurants = () => {
        const { restoData, openRestaurantDetail } = this.props;
        const restaurants = restoData.map(({ restaurant }) => {
            return (
                <Link to='/restaurants/details'>
                    <span className="ui cards" id="restaurant" onClick={() => { openRestaurantDetail(restaurant.id) }}>
                        <span className="card">
                            <div className="image">
                                <img className="foodPic" alt="No Image Found" src={restaurant.thumb || homeBackground} />
                            </div>
                            <div className="content">
                                <div className="header">{restaurant.name}</div>
                            </div>
                            <div className="extra">
                                <span className="rating">Rating: {restaurant.user_rating.aggregate_rating} {restaurant.user_rating.rating_text}</span>
                                <span className="votes">Votes: {restaurant.user_rating.votes || 0}</span>
                                <div className="ui star rating" data-rating="4"></div>
                            </div>
                        </span>
                    </span >
                </Link>
            )
        });
        return restaurants;
    }

    render() {
        const { establishmentName } = this.props;
        return (
            <React.Fragment>
                <div className="home"><i>Foodie - {establishmentName} </i></div>
                <div className="restaurantList restoBckGrnd">
                    {this.renderRestaurants()}
                </div>
            </React.Fragment>
        )
    }
}

export default RestaurantsComponent;
