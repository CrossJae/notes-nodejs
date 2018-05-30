const path = require('path');

// 打印出path的方法
console.log(path);

/*
 * resolve
 * 将多个片段解析为绝对路径
 * 从右往左处理，依次解析
 * 
 * 最左侧如果不是/开头，则不算绝对路径，前面会加上当前工作目录的路径
*/
path.resolve(); // 当前工作目录路径
path.resolve('/foo/bar', 'baz'); // 从右到左解析，碰到/表示拼成绝对路径，/foo/bar/baz
path.resolve('foo/bar', 'baz'); //没有拼成绝对路径，当前目录+/foo/bar/baz
path.resolve('/foo/bar', '/baz'); // 最右已经是一个绝对路径，/baz

/*
 * normalize
 * 格式化、规范化路径，保留单个\或/
 * win和posix系统有差异
*/
path.normalize('temp///name///hi/..'); // temp/name
path.normalize('temp////name///hi'); // temp/name/hi

/*
 * isAbsolute
*/