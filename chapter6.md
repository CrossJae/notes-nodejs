## 理解Buffer

1. Buffer结构
  1. Buffer像数组，主要用于操作字符串
  2. Buffer是js与C++结合的模块，性能相关是c++实现，非性能部分由js实现。
  3. Buffer对象类似数组，它的元素是16位字符，0-255
  4. Buffer内存分配：
    * node采用slab分配机制，slab是一块申请好的固定大小的区域。slab有三种状态：full（完全分配）、partial（部分分配）、empty（没有被分配）。
    * 指定buffer对象的方法：`new Buffer(size)`、
    * node以8kb为界限来区分buffer是大对象还是小对象
    * buffer的分配过程中，主要使用一个局部变量pool作为中间处理对象
2. Buffer的转换
  1. 字符串转Buffer `new Buffer(str, [encoding])`
  2. Buffer转字符串 `buf.toString([encoding], [start], [end])`
  3. `Buffer.isEncoding(encoding)` 返回true表示Buffer支持该编码类型
3. Buffer的拼接
  1. Buffer在使用场景中，通常是一段一段方式传输，从输入流中读取内容的方法：
  ```
  var fs = require('fs');

  var rs = fs.createReadStream('test.md');
  var data = '';
  rs.on('data', function(){
    data += chunk;
  });
  rs.on('end', function(){
    console.log(data);
  })
  ```
  2. 乱码是如何产生的
    * 宽字节的中文在utf-8中占三个字节。
  3. setEncoding() 和 string_decoder()
  ```
  var StringDecoder = require('string_decoder').StringDecoder;
  var decoder = new StringDecoder('utf-8');
  ```
    * setEncoding()可以解决大部分乱码的问题，但并未根本解决问题
  4. 正确拼接Buffer： 使用数组拼接，`iconv-lite`转码模块
  ```
  var chunks = [];
  var size = 0;
  res.on('data', function(){
    chunks.push(chunk);
    size += chunk.length;
  });
  res.on('end', function(){
    var buf = Buffer.concat(chunks,size);
    var str = iconv.decode(buf, 'utf8');
    console.log(str);
  });
  ```
4. Buffer与性能
  
*-end-*
