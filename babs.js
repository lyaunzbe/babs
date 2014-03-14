var fs = require('fs'),
    file = __dirname + '/data.json',
    request = require('superagent');


setInterval(function(){
  request
    .get('http://bayareabikeshare.com/stations/json')
    .set('Accept', 'application/json')
    .end(function(res){
      var nData = JSON.parse(res.text);
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          console.log('Error: ' + err);
          return;
        }

        oData = JSON.parse(data);
        oData.collection.push(nData);

        fs.writeFile(file, JSON.stringify(oData, null, 2), function(err){
          if(err){
            console.log('Error: ' + err);
            return;
          }
        });
      });
    });

}, 60000);
