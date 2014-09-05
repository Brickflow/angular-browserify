var http = require('http');
var fs = require('fs');

function requestAngularFile(name, version) {
  var filename = 'angular';
  if (name.length && name[0] !== '.') {
    filename += '-' + name;
  } else if (name[0] === '.') {
    filename += name;
  }
  filename += '.js';
  var url = 'http://ajax.googleapis.com/ajax/libs/angularjs/' +
	version + '/' + filename;
  var file = fs.createWriteStream('lib/' + filename);
  var request = http.get(url, function(response) {
    response.pipe(file);
  });
}

[
	'', '.min',
	'touch', 'touch.min',
	'mocks', 
  'resource', 'resource.min',
	'cookies', 'cookies.min',
	'route', 'route.min',
	'sanitize', 'sanitize.min',
	'animate', 'animate.min'
].forEach(function(name) {
  requestAngularFile(name, process.argv[2] || '1.3.0-rc0');
});

