const routes = require('express').Router();

const employee = require('./employee');
const division = require('./division');

routes.use('/employee', employee);
routes.use('/division', division);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to api!' });
});

module.exports = routes;