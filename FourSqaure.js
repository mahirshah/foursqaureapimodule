/**
 * The FourSquare API module
 */
var FourSquare = (function (window, $, undefined) {
    'use strict';
    
    // the public returned object
    var FourSquare = {},
        _apiKeys = {
            VERSION: '20150717'
        },
        _urls = {
            RESTAURANTS: 'https://api.foursquare.com/v2/venues/search',
            BASE: 'https://api.foursquare.com/v2/venues/',
            TIPS: function (restaurantId) {
                return this.BASE + restaurantId + '/tips/';
            },
            MENU: function (restaurantId) {
                return this.BASE + restaurantId + '/menu/';
            }
        };

    /**
     * A initialization function to setup api keys. Must be called before calling any other function.
     * @param oauthParams
     */
    FourSquare.init = function (oauthParams) {
        if (!oauthParams || !oauthParams.id || !oauthParams.secret) throw "Init object must contain both client id and client secret";

        _apiKeys.CLIENT_ID = oauthParams.id;
        _apiKeys.CLIENT_SECRET = oauthParams.secret;

        // return this for chainability
        return this;
    };

    /**
     * Used to make a endpoint call to the FourSquare API
     * @param url - the FourSquare endpoint url
     * @param queryParams - additional query parameters to be added (api_key already included)
     * @returns {Promise}
     * @private
     */
    function _fourSquareGet(url, queryParams) {
        var ajaxArgs = {
            crossDomain: true,
            dataType: 'jsonp',
            data: {
                'client_id': _apiKeys.CLIENT_ID,
                'client_secret': _apiKeys.CLIENT_SECRET,
                'v': _apiKeys.VERSION
            }
        };
        queryParams = queryParams || {};

        Object.keys(queryParams).forEach(function (key) {
            ajaxArgs.data[key] = queryParams[key];
        });

        return $.ajax(url, ajaxArgs);
    }

    /**
     * Get restaurant data from the API
     * @param queryArgs - optional query parameters to be passed with the request
     * @returns {Promise}
     */
    FourSquare.getRestaurants = function (queryArgs) {
        queryArgs = queryArgs || {};

        return _fourSquareGet(_urls.RESTAURANTS, queryArgs);
    };

    /**
     * Get 'tips' from the FourSquare API for a particular restaurant given a restaurant JSON object
     * @param restaurant - the JSON restaurant object returned from the Foursquare API
     * @param queryArgs - optional query parameters to be passed with the request
     * @returns {Promise}
     */
    FourSquare.getRestaurantReviews = function (restaurant, queryArgs) {
        queryArgs = queryArgs || {};

        return _fourSquareGet(_urls.TIPS(restaurant.id), queryArgs);
    };

    /**
     * Get menus from the FourSquare API for a particular restaurant given a restaurant JSON object
     * @param restaurant - the JSON restaurant object returned from the Foursquare API
     * @param queryArgs - optional query parameters to be passed with the request
     * @returns {Promise}
     */
    FourSquare.getRestaurantMenu = function (restaurant, queryArgs) {
        queryArgs = queryArgs || {};

        return _fourSquareGet(_urls.MENU(restaurant.id), queryArgs);
    };

    return FourSquare;
})(window, jQuery);
