

/*
 * __filename
 * __dirname
 * 当前模块的路径，都是绝对路径
*/
// 在cli中node此js
// $ node api/02\ module.js
console.log(__filename);
console.log(__dirname);
console.log(path.dirname(__filename));
// /Users/xxx/Desktop/git/book/notes-nodejs/api/02 module.js
// /Users/xxx/Desktop/git/book/notes-nodejs/api
// /Users/xxx/Desktop/git/book/notes-nodejs/api