const express = require('express');
const app = express();

app.use(express.static('./dist'));

app.listen(5000, function(){
    console.log('服务器启动成功');
})