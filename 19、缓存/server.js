const express = require('express');

const app = express()
app.use(express.static('dist',  {
    maxAge: 3600000
}))

app.listen(8888, function(){
    console.log('启动服务器！！');
})