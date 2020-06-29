

/*
    webpack ./src/index.js -o ./dist/build.js --mode=development
    webpack打包以./src/index.js为入口文件开始打包。打包完后输出到./dist/build.js的目录下面，整体打包环境是develoment的环境

    webpack ./src/index.js -o ./dist/build.js --mode=production
    webpack打包以./sec/index.js为入口文件开始打包。打包完后输出到./dist/build.js的目录下面，整体打包环境是production
*/ 


// 引人less文件
import './index.less';

import './data.json';
function add(x, y) {
    return x + y;
}

console.log(add(1,2));
