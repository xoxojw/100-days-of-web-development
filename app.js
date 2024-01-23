const path = require("path");
const fs = require("fs");

const express = require("express");
const uuid = require("uuid");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/restaurants", (req, res) => {
	const filePath = path.join(__dirname, "data", "restaurants.json");

	const fileData = fs.readFileSync(filePath);
	const restaurantsData = JSON.parse(fileData);

	res.render("restaurants", {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
	});
});

app.get('/restaurants/:id', (req, res) => { // /restaurants/r1
	const restaurantId = req.params.id;
	const filePath = path.join(__dirname, "data", "restaurants.json");

	const fileData = fs.readFileSync(filePath);
	const restaurantsData = JSON.parse(fileData);

	for (const restaurant of restaurantsData) {
		if (restaurant.id === restaurantId) {
			return res.render('restaurant-detail', { restaurant: restaurant });
		}
	};

	return res.status(400).render('404');
});

app.get("/recommend", (req, res) => {
	res.render("recommend");
});

app.post("/recommend", (req, res) => {
	const restaurant = req.body;
	restaurant.id = uuid.v4();
	const restaurants = getStoredRestaurants();

	restaurants.push(restaurant);

	storeRestaurants(restaurants);

	res.render("confirm");
});

app.get("/comfirm", (req, res) => {
	res.render("comfirm");
});

app.get("/about", (req, res) => {
	res.render("about");
});

// 404 Not Found
app.use((req, res) => {
	res.status(404).render('404');
});
// '/admin'으로 시작하는 모든 경로에 대한 미들웨어, '/admin'으로 시작하는 모든 요청은 404로 라우팅된다.
// app.use('/admin', (req, res) => {
// 	res.render('404');
// });

// 500 Internal Server Error
app.use((error, req, res, next) => {
	ren.status(500).rendor('500');
 });

app.listen(4000);
