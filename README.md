# FourSqaure API Module 
A simple, promise based JS module for the FourSqaure API dependent on jQuery.

### Allows you to easily get venue information, menus, and venue reviews.

#### Init the module first
```
Foursqaure.init({
  id: 'CLIENT_ID',
  secret: 'CLIENT_SECRET'
})
```

#### Get venue inforation
```
FourSqaure.getRestaurants({
        'near': '...',
        'limit': 50,
        'categoryId': '...'
}).then(function(response) {
  ...
});
```

#### Get the menu for a particular venue
```
FourSqaure.getRestaurantMenu(venueObject, {...queryParam...});
```

### Get the reviews for a particular venue
```
FourSqaure.getRestaurantReviews(venueObject, {...queryParam...});
```
