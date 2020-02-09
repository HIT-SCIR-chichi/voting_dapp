var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req,res){
    var pathName = path.resolve(__dirname + url.parse(req.url).pathname);
    console.log('request for: ' + pathName + ' received.')
    fs.readFile(pathName,function(err,data){
        if(err){
            console.log(err);
	    response.writeHead(404, {'Content-Type': 'text/html'});
	}else{
	     if(pathName.lastIndexOf('.ico') > -1){
                res.writeHead(200, {'Content-Type': 'image/x-icon'});
            }else{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            }
            res.write(data.toString());
        }
	res.end();
    });
}).listen(8888);
console.log('Server running at http://108.61.126.96:8888/');
