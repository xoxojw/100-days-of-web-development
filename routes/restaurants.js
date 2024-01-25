const express = require('express');

const router = express.Router();

const uuid = require('uuid');

const resData = require('../util/restaurant-data');

router.get('/restaurants', (req, res) => {
	let order = req.query.order;
	let nextOrder = 'desc';

	if (order !== 'asc' && order !== 'desc') {
		order = 'asc';
	}

	if (order === 'desc') {
		nextOrder = 'asc';
	}

	const restaurantsData = resData.getStoredRestaurants();

	restaurantsData.sort((resA, resB) => {
		if (
			(order === "asc" && resA.name > resB.name) ||
			(order === "desc" && resB.name > resA.name)
		) {
			return 1;
		}
		return -1;
	});

	res.render('restaurants', {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
		nextOrder: nextOrder,
	});
});

router.get('/restaurants/:id', (req, res) => { // /restaurants/r1
	const restaurantId = req.params.id;
	const restaurantsData = resData.getStoredRestaurants();

	for (const restaurant of restaurantsData) {
		if (restaurant.id === restaurantId) {
			return res.render('restaurant-detail', { restaurant: restaurant });
		}
	};

	return res.status(400).render('404');
});

router.get('/recommend', (req, res) => {
	res.render('recommend');
});

router.post('/recommend', (req, res) => {
	const restaurant = req.body;
	restaurant.id = uuid.v4();
	const restaurants = resData.getStoredRestaurants();

	restaurants.push(restaurant);

	resData.storeRestaurants(restaurants);

	res.render('confirm');
});

router.get('/comfirm', (req, res) => {
	res.render('comfirm');
});

module.exports = router;