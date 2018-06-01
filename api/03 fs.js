const path = require('path');
const fs = require('fs');

const fsPath = path.join(__dirname, '/demo/fsWriteFile.md');
console.log(fsPath);


/*
 * stat('文件路径', 回调函数)
 * 用途：判断文件是否存在
*/
fs.stat(fsPath, (err, res) => {
    console.log(res);
})

/*
 * writeFile('文件路径', '写入内容', 回调函数)
 * 异步
 * 用途：写入内容
*/

/*
 * appendFile
 * 用法同writeFile
 * 用途：文件追加内容
*/
// fs.appendFile(fsPath, '!!!', (err)=>{
//     if(err) throw err;
// })

/*
 * unlink(path, callback)
 * 用途：删除文件
*/

/*
 * readFile(path[, options], callback)
 * options是编码，如utf8
 * 用途：读取文件内容
*/
fs.readFile(fsPath, (err, data)=>{
    if(err) throw err;
    console.log(data)
})

/*
 * rename(oldname, newname, callback)
 * 用途：文件重命名
*/