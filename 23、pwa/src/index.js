require('./css.css');
function add(a, b) {
    return a + b;
}

const res =add(1, 2);

console.log(res);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(res => {
            console.log('service-worker启动成功！！', res);
        }).catch(err => {
            console.log('service-worker启动失败！！', err);
        });
    });
}

