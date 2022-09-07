/* 获取随机整数 */
export function randomNum(m,n){
  var num = Math.floor(Math.random()*(m - n) + n);
  return num;
}

/* 获取1-100之间的随机整数 */
// var num = this.randomNum(1,101)；
// console.log(num);