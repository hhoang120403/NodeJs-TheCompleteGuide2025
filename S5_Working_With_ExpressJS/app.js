const path = require('path');

const express = require('express');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Handlebars
const { engine } = require('express-handlebars');
// app.engine(
//   'hbs',
//   engine({
//     extname: 'hbs',
//     defaultLayout: 'main-layout',
//     layoutsDir: 'views/layouts/',
//   })
// );
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// Pug
// app.set('view engine', 'pug');
// app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use((req, res, next) => {
//   console.log('In the middleware!');
//   next(); // Allows the request to continue to the next middleware in line
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
