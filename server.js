var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req,res){
    var originPath = url.parse(req.url).pathname;
    var pathName = path.resolve(__dirname + originPath);
    var htmlPath = path.resolve(__dirname + '/index.html');
    var htmlData;
    fs.readFile(htmlPath, function(err,data){
        if(err)
            console.log(err);
        else
            htmlData = data;
    });
    fs.readFile(pathName,function(err,data){
        if(err || originPath != 'favicon.ico'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            if(err){
                data = htmlData;
                pathName = htmlPath;
            }
        }
        else{
            res.writeHead(200, {'Content-Type': 'image/x-icon'});
        }
        console.log('request for: ' + pathName + ' received.');
        res.write(data.toString());
	    res.end();
    });
}).listen(8888);
console.log('Server running at http://108.61.126.96:8888');
