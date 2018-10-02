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
var TablePlayer = (function () {
  function TablePlayer($el, head = [], data = [], showCount = 10, interval = 5) {
    this.$el = $el;
    this.head = head;
    this.data = data;
    this.showCount = showCount;
    this.interval = interval;
    this.curPage = 1;
    this.maxPage = Math.ceil(data.length / showCount);
  }

  TablePlayer.prototype = (function () {
    var _getPartialData = function (thisObj) {
        var startIdx = (thisObj.curPage - 1) * thisObj.showCount;
        var endIdx = thisObj.curPage < thisObj.maxPage ? thisObj.curPage * thisObj.showCount : thisObj.data.length;

        return thisObj.data.slice(startIdx, endIdx);
      },

      _createHead = function (thisObj) {
        var tableHead = document.createElement('thead');
        var headData = thisObj.head;
        var innerData = '';
        for (var i = 0, len = headData.length; i < len; i++) {
          innerData += `<th scope="col">${headData[i]}</th>`;
        }

        tableHead.innerHTML = '<tr>' + innerData + '</tr>';
        return tableHead;
      },

      _render = function (thisObj) {
        var tableContainer = thisObj.tableContainer = document.createElement('table');
        tableContainer.className = 'table table-striped table-sm deptable';
        var tableHead = _createHead(thisObj);
        var tableBody = _createBody(_getPartialData(thisObj));

        tableContainer.appendChild(tableHead);
        tableContainer.appendChild(tableBody);
        thisObj.$el.appendChild(tableContainer);
        _goNextPage(thisObj);
      },

      _createBody = function (partialData) {
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
      },

      _goNextPage = function (thisObj) {
        if (thisObj.curPage < thisObj.maxPage) {
          thisObj.curPage++;
        } else {
          thisObj.curPage = 1;
        }
      },

      _destroy = function (thisObj) {
        thisObj.tableContainer.remove();
      },

      show = function () {
        var self = this;
        _render(this);
        this.setInterval = setInterval(function () {
          _destroy(self);
          _render(self);
        }, self.interval * 1000);
      },

      remove = function () {
        clearInterval(this.setInterval);
        _destroy(this);
      }

    return {
      show: show,
      hide: remove
    }
  })();

  return TablePlayer;
})();
