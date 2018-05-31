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
 * 类似resolve，resolve是拼接成绝对路径，join只是拼接成路径
*/

/*
 * dirname
 * 返回目录名，忽略最后
*/
path.dirname('/baz/'); // 返回/
path.dirname('/baz/bar'); //返回/baz

/*
 * basename
 * 返回路径最后一部分
 * 可选参数：文件扩展名
*/
path.basename('/baz/bar'); //返回bar
path.basename('/baz/bar/'); //返回bar
path.basename('/baz/bar.html', '.html'); //返回bar

/*
 * extname
 * 返回扩展名
*/
path.extname('/baz/bar'); //返回为空
path.extname('.html'); //返回为空
path.extname('hello.html'); //返回.html

/*
 * fomat
 * 传入对象
 * 将传入的对象整理成路径
 * @param   root
 * @param   dir
 * @param   base
 * @param   name
 * @param   ext
*/
path.format({}); //返回为空
path.format({
    root: '/foo',
    dir: '/bar',
    base: 'hello.html'
});// root和dir同时存在，忽略root，使用dir，返回'/bar/hello.html'
path.format({
    dir: '/bar',
    base: 'hello',
    ext: '.txt'
});// base存在时，忽略name和ext，即便base中并没有带扩展名，返回'/bar/hello'

/*
 * parse
 * 与format相反
*/
path.parse('/bar/hello.html');
//返回
// { root: '/',
//   dir: '/bar',
//   base: 'hello.html',
//   ext: '.html',
//   name: 'hello' }

/*
 * sep
 * 分隔符\或/
 * win和posix系统有差异
*/