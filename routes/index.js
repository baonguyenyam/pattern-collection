var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Patterns Collection by Bao Nguyen' });
});


router.get('/getimg', function (req, res) {
  var listIMG = []
  fs.readdir('./public/img', function (err, items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].indexOf(".") > -1) {
        listIMG.push(items[i])
			}
		}
    res.send(listIMG)
	});
})

module.exports = router;
