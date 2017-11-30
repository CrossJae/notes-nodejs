## 理解Buffer

1. Buffer结构
  1. Buffer像数组，主要用于操作字符串
  2. Buffer是js与C++结合的模块，性能相关是c++实现，非性能部分由js实现，
  3. Buffer对象类似数组，它的元素是16位字符，0-255
  4. Buffer内存分配：
    * node采用slab分配机制，slab是一块申请好的固定大小的区域。slab有三种状态：full（完全分配）、partial（部分分配）、empty（没有被分配）。
    * 指定buffer对象的方法：`new Buffer(size)`
    * node以8kb为界限来区分buffer是大对象还是小对象
    * buffer的分配过程中，主要使用一个局部变量pool作为中间处理对象

*-end-*
