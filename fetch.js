var http = require('http');
var fs = require('fs');

function requestAngularFile(name, version) {
  var filename = 'angular';
  if (name.length) {
    filename += '-' + name;
  }
  filename += '.js';
  var url = 'http://ajax.googleapis.com/ajax/libs/angularjs/' +
	version + '/' + filename;
  var file = fs.createWriteStream('lib/' + filename);
  var request = http.get(url, function(response) {
    response.pipe(file);
  });
}

['', 'touch', 'mocks', 'cookies', 'route'].forEach(function(name) {
  requestAngularFile(name, process.argv[2] || '1.2.16');
});

