//将图片缩放比例
function zoom(img) {
  let zoom = 100 / img.width;
  return {
    width: img.width * zoom,
    height: img.width * zoom
  }
};
//打包url 保持接口的粒度
function codeUrl(word,page,row) {
  // pages/images.js 搜索链接 &word=狗&pn=30&rn=30
  let url = "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=r"
  return url = url + "&word=" + word + "&pn" + (page * row - row) + "&rn=" + row;
}

//解压图片路径
function imgUrlEncode(imgUrl){
  let encryption = {
    "w": "a",
    "k": "b",
    "v": "c",
    "1": "d",
    "j": "e",
    "u": "f",
    "2": "g",
    "i": "h",
    "t": "i",
    "3": "j",
    "h": "k",
    "s": "l",
    "4": "m",
    "g": "n",
    "5": "o",
    "r": "p",
    "q": "q",
    "6": "r",
    "f": "s",
    "p": "t",
    "7": "u",
    "e": "v",
    "o": "w",
    "8": "1",
    "d": "2",
    "n": "3",
    "9": "4",
    "c": "5",
    "m": "6",
    "0": "7",
    "b": "8",
    "l": "9",
    "a": "0",
    "_z2C\\$q": ":",
    "_z&e3B": ".",
    "AzdH3F": "/"
  };
  let enkey = Object.keys(encryption)
  let reg = new RegExp(enkey.join("|")+"|.","g"),psw;
  let code =[];
  while(psw = reg.exec(imgUrl)){
    if (psw[0] === "_z2C$q") {
      psw[0] = "_z2C\\$q";
    }
    code.push(encryption[psw] ? encryption[psw] : psw[0]);
  }
  return code.join("");
}
export { zoom, codeUrl, imgUrlEncode}
