function select(){
  this.init.apply(this, arguments);
}
select.prototype = {
  init: function(el, paramObj) {
    var self = this
    var target = document.getElementById(el);
    target.className += ' ' + 'select'
    target.innerHTML = '请选择'
    var div = document.createElement("div");
    div.className = 'select-div'
    var _html = ''
    var arr = paramObj || paramObj.join();
    if (arr instanceof Array) {
      for (var i = 0; i < arr.length; i++) {
        _html += '<p>' + arr[i] + '</p>'
      }
    }
    div.innerHTML = _html
    var pTags = div.getElementsByTagName('p')
    for (var j=0;j<pTags.length;j++){
      pTags[j].addEventListener('click', function() {self.addTopic(target,div,this)}, true)
    }
    this.insertAfter(div, target)
    target.addEventListener('click', function(e) {
      if(e.target.nodeName === 'SPAN'){
        self.removeTopic(target,e.target)
      } else {
        div.style.display = 'block'
      }
    }, true)
    window.addEventListener('click', function() {div.style.display = 'none'}, true)
  },
  insertAfter: function(newElement, targetElement) {
    var parent = targetElement.parentNode; // 找到指定元素的父节点
    if (parent.lastChild == targetElement) { 
      //判断指定元素的是否是节点中的最后一个位置如果是的话就直接使用appendChild方法
      parent.appendChild(newElement, targetElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  },
  addTopic: function (target,div,el) {
    div.style.display = 'none'
    if (target.innerHTML === '请选择') {
      target.innerHTML = '<span>#' + el.innerHTML + '#</span>'
    } else if (target.innerHTML.indexOf(el.innerHTML) < 0) {
      target.innerHTML += '<span>#' + el.innerHTML + '#</span>'
    }
  },
  removeTopic: function (target,el) {
    el.parentNode.removeChild(el);
    if (target.innerHTML === '') {
      target.innerHTML = '请选择'
    }
  }
}
