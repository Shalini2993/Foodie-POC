import React from 'react';
import get from 'lodash/get';
import homeBackground from '../images/homeBackground.jpg';

const mapTableData = (data) => {
    const tableData = data.map(item => {
        return (
            <td className="listitem">
                <i className="circle icon circleIcon"></i>
                {item}
            </td>
        )
    });
    return tableData;
}

const renderCuisine = (cuisines) => {
    const cuisineArray = cuisines.includes(',') ? cuisines.split(', ') : cuisines.split();
    const cuisine = mapTableData(cuisineArray);
    return (
        <table>
            <tr className="displayFlex flexWrap">
                {cuisine}
            </tr>
        </table>
    );
}

const renderHighlights = (highlights) => {
    const hightlight = mapTableData(highlights)
    return (
        <table>
            <tr className="displayFlex flexWrap">
                {hightlight}
            </tr>
        </table>
    );
}

const renderBreadCrumb = (restData) => {
    const { location, timings, phone_numbers, average_cost_for_two, currency, user_rating } = restData;
    return (
        <React.Fragment>
            <div className="item address">
                <i className="marker icon headerIcon"></i>
                <span className="content">
                    {location.locality_verbose}
                </span>
            </div>
            <div className="address">
                <i className="calendar icon headerIcon"></i>
                <span>{timings}</span>
            </div>
            <div className="address">
                <i className="phone square icon headerIcon"></i>
                <span>{phone_numbers}</span>
            </div>
            <div className="address">
                <i className="money bill alternate icon headerIcon"></i>
                <span>Average cost (2) - {average_cost_for_two} {currency}</span>
            </div>
            <div className="address">
                <i className="star icon headerIcon"></i>
                <span>Rating: {user_rating.aggregate_rating} {user_rating.rating_text} ({user_rating.votes || 0})</span>
            </div>
        </React.Fragment>
    )
}

const RestaurantInformation = ({ restoData, restoId }) => {
    const data = (restoData || []).filter(item => item.restaurant.id === restoId);
    const restData = get(data, '[0]', []).restaurant;
    const { thumb, name, cuisines, highlights, menu_url } = restData;
    return (
        <div className="displayFlex">
            <div className="leftPane">
                <img className="restaurantImage" src={thumb || homeBackground} />
            </div>
            <div className="restoBckGrnd">
                <div className="rightPane">
                    <div className="home">{name}</div>
                    <div className="ui fitted divider"></div>
                    {renderBreadCrumb(restData)}
                    <div className="ui fitted divider"></div>
                    <div className="highHeader">Cuisines</div>
                    {renderCuisine(cuisines)}
                    <div className="ui fitted divider"></div>
                    <div className="highHeader">Restaurant Highlights</div>
                    {renderHighlights(highlights)}
                    <div className="ui fitted divider"></div>
                    <div className="highHeader">
                        For menu details <span className="link" onClick={() => window.open(menu_url)}>click here</span>
                    </div>
                    <div className="ui fitted divider"></div>
                    <div className="highHeader">Reviews</div>
                    <div>No reviews yet</div>
                </div>
            </div>
        </div >
    )
}

export default RestaurantInformation
