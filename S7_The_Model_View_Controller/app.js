const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const { get404 } = require('./controllers/error');
const User = require('./models/user');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('687084b5bfe10a0d600b454e')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoose
  .connect(
    'mongodb+srv://jayt1204:PAeVl2onFVh6iohl@cluster0.tuxfxmj.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'JayT',
          email: 'jayt@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
