const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// This will send if any route we have not created is accessed
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;