// Date 객체 생성
let date = new Date();

function showCalender() {
  var nowYear = date.getFullYear();
  var nowMonth = date.getMonth();

  // 오늘 날짜 보여주기
  document.querySelector('.date_today').textContent = `${nowYear}년 ${nowMonth + 1}월`;


  // 지난 달,이번 달의 마지막 날짜,요일 정보 가져오기
  var prevLast = new Date(nowYear, nowMonth, 0);
  var thisLast = new Date(nowYear, nowMonth + 1, 0);

  var prevDate = prevLast.getDate();
  var prevDay = prevLast.getDay();

  var thisDate = thisLast.getDate();
  var thisDay = thisLast.getDay();

  // Dates 기본 배열들
  var prevDates = [];
  var thisDates = [];
  for (let i = 1; i <= thisDate; i++) {
    thisDates.push(i);
  }
  var nextDates = [];

  // prevDates 계산
  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
    }
  }

  // nextDates 계산
  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i)
  }

  // Dates 합치기
  var dates = prevDates.concat(thisDates, nextDates);

  // Dates 정리
  var firstDateIndex = dates.indexOf(1);
  var lastDateIndex = dates.lastIndexOf(thisDate);

  // 이번 달 또는 다른 달의 날짜 클래스 나눔
  dates.forEach((date, i) => {
    var condition = i >= firstDateIndex && i < lastDateIndex + 1
      ? 'this'
      : 'other';

    dates[i] = `<div class="date" ><span class="${condition}" onclick="showTodo()">${date}</span></div>`;
  })

  // Dates 그리기
  document.querySelector('.dates').innerHTML = dates.join('');
}

// 이전 달로 이동
function prevMonth() {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  showCalender();
}

// 다음 달로 이동
function nextMonth() {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  showCalender();
}

// 현재 달로 이동
function goToday() {
  date = new Date();
  showCalender();
}

// 유저정보 보여주기
function showUser(year, month, day) {
  document.querySelector('.todo_list_user').innerHTML
    = "<p>" + `${userInfo['type']} ${userInfo['name']} ${year}/${month}/${day}` + "</p>";
}


// todo 추가버튼 클릭시
function addTodo() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("todo_input").value;
  var t = document.createTextNode(inputValue);

  li.appendChild(t);
  if (inputValue === '') {
    alert("내용을 입력하세요.");
  } else {
    document.getElementById("my_list").appendChild(li);
  }
  document.getElementById("todo_input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  // todo list에서 삭제버튼 관련
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }

  li.appendChild(span);

}


//테스트용 임시 유저정보
userInfo = {}
userInfo['type'] = '팀장'
userInfo['name'] = '김민수'

goToday();
showUser(date.getFullYear(), date.getMonth() + 1, date.getDate());
