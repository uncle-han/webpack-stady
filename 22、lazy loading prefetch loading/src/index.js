console.log('加载了index.js');

document.getElementById('btn').onclick = function() {
    /*
        懒加载：
            工作方式：程序开始打包的时候，不加载，当调用这个快的时候，才调用包，假如包很大，会感觉到卡顿，才能看到效果
            优点：兼容性比prefetch好
        预加载：prefetch
            工作方式：当程序走完了，浏览器有空余时间了才加载，不执行，等调用到这个懒加载的才执行文件里面的内容，
            假如包很大，不会阻塞线程，
            优点：不会阻塞线程
    */
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./js/test').then(({ add })=> {
        console.log(add(1, 5));
    })
}
