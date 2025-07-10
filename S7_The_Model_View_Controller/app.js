const path = require('path');

const express = require('express');

const { get404 } = require('./controllers/error');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Handlebars
// const { engine } = require('express-handlebars');
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

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use((req, res, next) => {
//   console.log('In the middleware!');
//   next(); // Allows the request to continue to the next middleware in line
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('686f33e068d7a66dc9c1f820')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(() => {
  app.listen(3000);
});
