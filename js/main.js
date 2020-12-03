window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }

  // voice input

document.getElementById("searching-icon").addEventListener("click", startDictation);

function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function (e) {
        document.getElementById('transcript').value = e.results[0][0].transcript;
        recognition.stop();
        document.getElementById('labnol').submit();
      };
      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  };

    // hide scroll for more/ return to results if in answer item

    setInterval (function() {
      if (window.location.href.indexOf("procid") > -1) {
        // document.getElementById('scroll').style.display = 'none';
        document.getElementById('results').style.display = 'block';
      }
      else if (window.location.href.indexOf("answerid") > -1) {
        // document.getElementById('scroll').style.display = 'none';
        document.getElementById('results').style.display = 'block';
      }
      else {
        // document.getElementById('scroll').style.display = 'block';
        // document.getElementById('results').style.display = 'none';
      }
    }, 300);

    // append query to return to results

    function updateSrc() {
      search = window.location.href.split('?')[1];
      addQuery = document.getElementById('silvercloudIframe').src + '?' +  search;
      document.getElementById('silvercloudIframe').src = addQuery;
    }

    function searchVariable() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const searchVar = urlParams.get('q');
      if (window.location.href.indexOf("?q=") > -1) {
        addQuery = document.getElementById('results').href + '?q=' +  searchVar;
        document.getElementById('results').href = addQuery;
      }
    };
    searchVariable();

  // date js
  function loadDate() {

  var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear();
  curMeridiem = objToday.getHours() > 11 ? "Good Afternoon" : "Good Morning"
    var today = dayOfWeek + " " + curMonth + " " + dayOfMonth + ", " + curYear;

    document.getElementById('date').textContent = today;
    document.getElementById('time-greeting').textContent = curMeridiem;

  };loadDate();

  // change microphone to search icon

  function check(){
    var checkInput = document.getElementById("transcript");
    var speechIcon = document.getElementById("speech-icon");
    var searchingIcon = document.getElementById("searching-icon");
    if (checkInput.value) {
      speechIcon.classList.remove("fa-microphone");
      speechIcon.classList.add("fa-search");
      searchingIcon.removeEventListener("click", startDictation);
      searchingIcon.setAttribute("type", "submit");
    } else {
      speechIcon.classList.add("fa-microphone");
      searchingIcon.addEventListener("click", startDictation);
    }
  }