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
