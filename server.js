var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  response.statusCode = 200;

  // 用户请求的网址，默认为index.html
  const filePath = path === '/' ? '/index.html' : path

  // 获取网址.的下标
  let index = path.lastIndexOf('.')

  // 获取.下标开始的字符串
  let suffix = path.substring(index)

  // 创建哈希表
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.xml': 'text/xml',
    '.json': 'text/json',
    '.ico': 'text/ico',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
  }
  response.setHeader("Content-Type", `${fileTypes[suffix] || 'text/html'} ;charset=utf-8`);
  let string
  try {
    string = fs.readFileSync(`./public${filePath}`)
  } catch (error) {
    string = "请求的文件不存在"
    response.statusCode = 404;
  }
  response.write(string);
  response.end();


  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
  port +
  " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
  port
);