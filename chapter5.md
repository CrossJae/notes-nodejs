## 内存控制

1. 内存泄漏：在早期版本中IE与DOM交互时发生的问题。
2. 无阻塞、事件驱动的node服务，具有内存消耗低的优点，适合处理海量的网络请求。
3. 内存控制，是海量请求 + 长时间运行的前提下进行探讨的
  * 海量请求：在服务端，资源寸土寸金，为海量用户服务，就要高效循环利用。
  * 长时间运行：对比浏览器中，网页应用基本都是运行事件很短的，进程退出，内存会释放。
4. 在服务端，内存管理的好坏，垃圾回收状况是否优良，都会对服务构成影响。
5. Node的js执行引擎V8
  * Node是构建在Chrome的js运行时上的平台
  * 内存限制：一般后端语言内存没什么限制，在node中，只能使用部分内存，源于v8对内存的限制
  * 对象分配：在V8中所有js对象都通过堆来进行分配。
  * v8提供选项可以使用更多内存`--max-old-space-size`或`--max-new-space-size`
  * 垃圾回收机制：
    * 主要策略：分代式垃圾回收机制
    * 内存分代：
      * 新生代：存活时间较短
      * 老生代：存活时间较长、常驻内存的对象
    * Scavenge算法（新生代中的对象垃圾回收方法）
      * 在Scavenge算法实现中主要使用了Cheney算法，Cheney算法主要采用复制的方式实现垃圾回收，它将内存一分为二，每部分空间成为semispace，通过将存活对象在两个semispace之间进行复制来实现。
      * 缺点：只能使用对内存中的一半
      * 优点：时间效率很高
      * 典型的牺牲空间换取时间
      * 一个对象多次复制依然存活，就被提升到老生代中，这个过程叫 *晋升*
    * Mark-Sweep与Mark-Compact（老生代中的对象垃圾回收方法）
      * Mark-Sweep : 标记清除。遍历堆中的所有对象，标记活着的对象，清除没有标记的对象。
      * Mark-Compact : 标记整理。解决Mark-Sweep清除对象后产生内存碎片不利于存储大对象的问题，将活着的对象往一边移动，移动后清除另一边的空间，完成回收。
    * Incremental Marking 增量标记
      * 垃圾回收时，会暂停应用逻辑，在回收老生代时，暂停的时间会比较长，为了降低带来的停顿时间，V8从标记阶段入手，采用增量标记，分成很多个小“步进”，没做完一个”步进“就运行一会应用逻辑，改进后，最大停顿时间减少到原来的1/6。
    * 垃圾回收，是影响性能的因素之一。
  * 查看垃圾回收日志
    * node启动使用`--prof`参数可以得到V8性能分析数据，`[CG]`部分是垃圾回收
    ```
    $ node --prof test.js
    // 查看分析数据
    $ linux-tick-processor v8.log
    ```
  * 高效使用内存
    * 作用域scope
      * 全局变量需要进程退出才会释放，如果需要释放它们，可以delete或者重新赋值。
    * 闭包
      * 无法正常的回收
  * 查看node进程内存使用情况，结果中的rss代表resident set size常驻内存部分；heapTotal堆中共申请的内存量；heapUsed堆中使用中的内存量，单位都是字节。
  ```
  $ node
  > process.memoryUsage()
  ```
  * 查看操作系统内存使用情况，os模块中的`totalmem()`总内存和`freemem()`闲置内存
  ```
  $ node
  > os.totalmem()
  > os.freemem()
  ```
  * 堆外内存：node中的内存使用并非都是通过v8进行分配的，不通过v8分配的内存叫堆外内存。
  * 内存泄漏的原因：
    * 缓存
      * 在node中，小心使用缓存，防止用cpu执行时间换内存空间
      * 尽量使用进程外缓存，这样可以让垃圾回收更高效、进程之间共享缓存，目前比价好的缓存有`redis`和`memcached`
    * 队列消费不及时
    * 作用域未释放
  * 内存泄漏排查，主要工具有`node-heapdump`和`node-memwatch`

*-end-*
