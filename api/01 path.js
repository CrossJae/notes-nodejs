const path = require('path');

// 打印出path的方法
console.log(path);

/*
 * resolve
 * 将多个片段解析为绝对路径
 * 从右往左处理，依次解析
*/
path.resolve(); // 当前工作目录路径
path.resolve('/foo/bar', 'baz'); // 从右到左解析，碰到/表示拼成绝对路径，/foo/bar/baz
path.resolve('foo/bar', 'baz'); //没有拼成绝对路径，当前目录+/foo/bar/baz
path.resolve('/foo/bar', '/baz'); // 最右已经是一个绝对路径，/baz
path.resolve('////foo/bar'); // 会规范化，同normalize /foo/bar

/*
 * normalize
 * 格式化、规范化路径，保留单个\或/
 * win和posix系统有差异
*/
path.normalize('temp///name///hi/..'); // temp/name
path.normalize('temp////name///hi'); // temp/name/hi

/*
 * isAbsolute
 * 判断是否是绝对路径
 * win和posix系统有差异
*/
path.isAbsolute('/baz'); // true
path.isAbsolute('../baz'); // false

/*
 * join
 * 
*/