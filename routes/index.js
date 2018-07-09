var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var crypto = require('crypto');
var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function (req, file, callback) {
		let type = 'jpg'
		if (file.mimetype === 'image/png') {
			type = 'png'
		} else if (file.mimetype === 'image/jpeg') {
			type = 'jpeg'
		} else {
			type = 'jpg'
		}
		callback(null, crypto.createHash('md5').update(Date.now() + "_" + removeVietnam(file.originalname.substring(0, 10))).digest('hex') + '.' + type);
	}
});
var upload = multer({ storage: Storage }).array(
	"imgUploader",
	10
);

function removeVietnam(s) {
	var r = s.toLowerCase().replace(/\s+/g, '-');
	non_asciis = {
		'-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
		'a': '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
		'ae': 'æ',
		'c': 'ç',
		'e': '[èéẹẽẻềệếểễê]',
		'd': '[đ]',
		'i': '[ìíîïị]',
		'n': 'ñ',
		'o': '[òóôõöộồốổỗơởợỡờớôơ]',
		'oe': 'œ',
		'u': '[ùúûűüủụưửựứừữư]',
		'y': '[ýỳỷỵỹ]'
	};
	for (i in non_asciis) {
		r = r.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	r = r.replace(/[^\w\s]/gi, '-')
	return r
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Patterns Collection by Bao Nguyen' });
});


router.get('/getimg', function (req, res) {
  var listIMG = []
  fs.readdir('./public/img', function (err, items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].indexOf(".png") > -1 || items[i].indexOf(".jpg") > -1) {
        listIMG.push(items[i])
			}
		}
    res.send(listIMG)
	});
})

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
		if (err) {
			return res.end("error");
		}
		return res.end("done");
	});
})

module.exports = router;
