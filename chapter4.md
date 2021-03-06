## 异步编程

1. 函数式编程
  * 高级函数：把函数作为参数，或是将函数作为返回值。
  ```
  function foo(x){
    return function(){
      return x;
    };
  }
  ```
  * node 提供的最基本的事件模块，事件的处理方式正是基于高阶函数的特性来完成的。
  ```
  var emitter = new events.EventEmitter();
  emitter.on('event_foo',function(){
      // todo
  });
  ```
  * 偏函数用法
    * 偏函数：参数或变量已经预置的函数
2. 异步编程的优势与难点
  * 优点：node最大的特点：基于事件驱动的 *非阻塞I/O模型* 。非阻塞I/O可以让CPU与I/O并不相互依赖等待，让资源更好的利用。对于网络应用而言，并行带来的想象空间更大，延展而开的是分布式和云。
  * 难点：
    1. 异常处理：node将异常作为回调函数的第一个实参传回，如果是空值，代表没有异常。
    2. 函数嵌套过深
    3. 阻塞代码
    4. 多线程编程：在浏览器中，js执行线程与UI渲染共用一个线程（web worker可以将js与ui渲染分离）。在node中，没有ui渲染部分。
    5. 异步转同步：同步需要借助库或者编译手段来实现。
3. 异步编程解决方案（针对上述问题）
  * 事件发布/订阅模式（事件监听模式）
    * *事件监听模式* 是一种广泛用于异步编程的模式，是回调函数的事件化，又称发布/订阅模式。
    ```
    // 订阅
    emitter.on("event",function(message){
      console.log(message);
    })
    // 发布
    emitter.emit("event1", "I am message");
    ```
    * 雪崩问题：在高访问量、大并发量的情况下缓存失效的场景，此时大量的请求同时涌向数据库，数据库无法承受如此大的查询请求，进而影响了整体网站速度。
  * Promise/Deferred模式
  * 流程控制库

*-end-*
