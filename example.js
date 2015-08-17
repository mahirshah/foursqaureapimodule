// some sample usage of the API.
// remember that jQuery is a dependency of the FourSquare module, so please load jQuery before loading the FourSquare module


// initialize the module with your API keys
FourSquare.init({
    id: '...',
    secret: '...'
})

    // now we can call get restaurants, which returns a promise
    .getRestaurants({
        'near': '...',
        'limit': 50,
        'categoryId': '...'
    })

    // once we have our response we can get the menus for every restaurant returned. The restaurant JSON is stored as an
    // array under 'response.venues'.
    .then(function (resp) {
        // this will return a bunch of promises for the restaurant menus
        return $.when.apply($, resp.response.venues.map(FourSquare.getRestaurantMenu));
    })

    // now we have all of the menu resolved objects as arguments
    .then(function () {
        // we first filter out any restaurants that don't have menus, then we output the menus to the console
        Array.prototype.filter.call(arguments, function (resp) {
            return resp[0].response.menu.menus.count;
        }).forEach(function (resp) {
            console.log(resp[0].response.menu.menus);
        });
    });
