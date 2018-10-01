/**
 * Table Player
 * 
 * Author : Seonho Kim
 * version : es5
 * date : 2018.10.1
 * description : interval 마디 일정 개수의 항목을 플레이하는 테이블 객체 생성
 * 
 * @param {node} $el 대상 Element Node
 * @param {array} head Table Head에 들어갈 column
 * @param {array} data 개별 row에 삽입될 column들
 * @param {number} showCount 한번에 보여질 최대 row
 * @param {number} interval refresh할 시간
 * 
 */

function TablePlayer($el, head = [], data = [], showCount = 10, interval = 5) {
  this.$el = $el;
  this.head = head;
  this.data = data;
  this.showCount = showCount;
  this.interval = interval;
  this.curPage = 1;
  this.maxPage = Math.ceil(data.length / showCount);
}

TablePlayer.prototype.getPartialData = function () {
  var startIdx = (this.curPage - 1) * this.showCount;
  var endIdx = this.curPage < this.maxPage ? this.curPage * this.showCount : this.data.length;

  return this.data.slice(startIdx, endIdx);
};

TablePlayer.prototype.render = function () {
  var tableContainer = this.tableContainer = document.createElement('table');
  var tableHead = this.createHead();
  var tableBody = this.createBody(this.getPartialData());

  tableContainer.appendChild(tableHead);
  tableContainer.appendChild(tableBody);
  this.$el.appendChild(tableContainer);
  this.goNextPage();
};

TablePlayer.prototype.createHead = function () {
  var tableHead = document.createElement('thead');
  var headData = this.head;
  var innerData = '';
  for (var i = 0, len = headData.length; i < len; i++) {
    innerData += `<th>${headData[i]}</th>`;
  }

  tableHead.innerHTML = '<tr>' + innerData + '</tr>';
  return tableHead;
};

TablePlayer.prototype.createBody = function (partialData) {
  var tableBody = document.createElement('tbody');
  var bodyData = partialData;
  var bodyInnerData = '';
  for (var i = 0, len = bodyData.length; i < len; i++) {
    var rowData = bodyData[i];
    var rowInnerData = '';
    for (var j = 0, len2 = rowData.length; j < len2; j++) {
      rowInnerData += `<td>${rowData[j]}</td>`;
    }
    bodyInnerData += `<tr>${rowInnerData}</tr>`;
  }

  tableBody.innerHTML = bodyInnerData;
  return tableBody;
};

TablePlayer.prototype.goNextPage = function () {
  if (this.curPage < this.maxPage) {
    this.curPage++;
  } else {
    this.curPage = 1;
  }
};

TablePlayer.prototype.show = function(){
  var self = this;
  
  this.render();
  setInterval(function(){
    self.destroy();
    self.render();
  }, self.interval * 1000);
};

TablePlayer.prototype.destroy = function(){
  this.tableContainer.remove();
};
