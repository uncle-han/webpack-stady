import '@babel/polyfill'
const add = (a, b) => {
    return a + b
}
const res = add(1, 2);
console.log(res);


const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        console.log('定时器执行完');
        resolve();
    }, 1000);
})
console.log(promise);