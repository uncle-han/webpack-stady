import output from './js/test'
import './css/a.css'

console.log('index.js文件更新了')
output();
function add(a, b) {
    return a + b
}
console.log(add(1, 1));

if(module.hot) {
    module.hot.accept('./js/test.js', function() {
        output();
    });
}
