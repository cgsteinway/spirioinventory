var express = require('express');
var router = express.Router();
var Inventory = require('../inventory');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Spirio Inventory' });
});

// get inventory data from db

router.get('/inventory', function(req, res) {
    Inventory
    .find('serial')
    .lean()
    .exec(function (err, items) {
        res.json(items)
    });
});


router.post('/addpiano', function(req, res) {
    
    console.log('looking for serial: ', req.body.serial);
    console.log('request body: ', req.body);
    
    Inventory.findOne({'serial' : req.body.serial}, function(err, data) {
            
        if (data) {
            console.log('serial number already recorded', data);
            res.json({"message": "a piano with this serial number already exists"});
            
    } else {
        console.log('no errors or duplicates found');       
        
        
    var np = new Inventory();
    
    np.model = req.body.model;
    np.serial = req.body.serial;
    np.location = req.body.location;
    np.showroom = req.body.showroom;
    np.sold = req.body.sold;
    np.dateOfSale = req.body.dateOfSale;
    np.appId = req.body.appId;
    np.appactivated = req.body.appactivated;
    np.custName = req.body.custName;
    np.custAddress = req.body.custAddress;
    np.custEmail = req.body.custEmail;
    np.custPhone = req.body.custPhone;
    
    np.save(function(err, np) {
//        if (err) console.log('error: ', err);
//            throw err;
        console.log('save ok');
        res.json(1);
//        return done(null, np);
    });
}
});
});

router.delete('/delete_piano/:id', function(req, res) {
    Inventory.findById(req.params.id, function( err, piano) {
        piano.remove(function(err, raw) {
            if(err) return next( err );
            res.json(1);
        });
    });
});


module.exports = router;
