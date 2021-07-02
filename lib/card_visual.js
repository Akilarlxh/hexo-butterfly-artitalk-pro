function cardVisual() {
  let btninner = document.getElementById("cardVisual");
  let powervis = document.getElementsByClassName('power')[0].style.display;
  if (powervis == "none") {
    document.getElementsByClassName('power')[0].style.display = 'inline';
    var authorlist = document.getElementsByClassName("shuoshuo_author_img");
    if (authorlist) {
      for (var i = 0; i < authorlist.length; i++) {
        var authorimg = authorlist[i];
        authorimg.style.display = "inline";
      }
    }
    btninner.innerHTML = "隐藏";
  } else {
    document.getElementsByClassName('power')[0].style.display = 'none';
    var authorlist = document.getElementsByClassName("shuoshuo_author_img");
    if (authorlist) {
      for (var i = 0; i < authorlist.length; i++) {
        var authorimg = authorlist[i];
        authorimg.style.display = "none";
      }
    }
    btninner.innerHTML = "编辑";
  }
}
