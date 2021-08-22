const http = require('http')
const fs = require('fs')
const port = process.env.port || 3000

function serverStaticFiles(res, path, contentType, responseCode=200){
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type': contentType})
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/plain'})
    // res.end('HelloWorld!')
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path){

        case '':
            serverStaticFiles(res, '/public/home.html', 'text/html')
            break


        // case '':
        //     res.writeHead(200, {'Content-Type': 'text/plain'})
        //     res.end('Homepage')
        //     break

        case '/about':
            serverStaticFiles(res, '/public/about.html', 'text/html')
            break
            // res.writeHead(200, {'Content-Type': 'test/plain'})
            // res.end('About')
            // break

        // default:
        //     res.writeHead(404, {'Content-Type': 'text/plain'})
        //     res.end('Not Found')
        //     break

        case '/img/logo.png':
            serverStaticFiles(res, '/public/404.html', 'text/html', 404)
            break
    
        default:
            serverStaticFiles(res, '/public/404.html', 'text/html', 404)
            break
    }

})

// server.listen(port, () => console.log(`server started on port ${port};` +
// 'press ctrl + C to terminate....'
// ))

server.listen(port, () => console.log(`server started at port ${port};` + 'press Ctrl + C for closing....'))