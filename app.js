const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

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
	res.status(500).rendor('500');
 });

app.listen(4000);
