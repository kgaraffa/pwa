window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }

    // scrolling cards

    var swiper = new Swiper('.swiper-jwp', {
      centeredSlides: false,
      slidesPerView: '2',
      longSwipesMs: 0,
     loopPreventsSlide:false,
      longSwipes: true,
      longSwipesRatio: 0,
      threshold: 0,
      slideToClickedSlide:true,
      speed: 900,
      loop: true,
      loopedSlides:100,
      spaceBetween: 20,
      keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
      grabCursor: true,
  
     
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
       
   });

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
        document.getElementById('sc-search-input-5fd0d311d1a5b55e574d3171').value = e.results[0][0].transcript;
        recognition.stop();
        document.getElementById('labnol').submit();
      };
      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  };

    // append q to sc input 

    setInterval (function addName() {
      document.getElementById('sc-search-input-5fd0d311d1a5b55e574d3171').setAttribute("name", "q");
    }, 1000);

    // hide scroll for more/ return to results if in answer item

    // setInterval (function() {
    //   if (window.location.href.indexOf("procid") > -1) {
    //     document.getElementById('scroll').style.display = 'none';
    //     document.getElementById('results').style.display = 'block';
    //   }
    //   else if (window.location.href.indexOf("answerid") > -1) {
    //     document.getElementById('scroll').style.display = 'none';
    //     document.getElementById('results').style.display = 'block';
    //   }
    //   else {
    //     document.getElementById('scroll').style.display = 'block';
    //     document.getElementById('results').style.display = 'none';
    //   }
    // }, 300);

    // append query to return to results

    // function updateSrc() {
    //   search = window.location.href.split('?')[1];
    //   addQuery = document.getElementById('silvercloudIframe').src + '?' +  search;
    //   document.getElementById('silvercloudIframe').src = addQuery;
    // }

    // function searchVariable() {
    //   const queryString = window.location.search;
    //   const urlParams = new URLSearchParams(queryString);
    //   const searchVar = urlParams.get('q');
    //   if (window.location.href.indexOf("?q=") > -1) {
    //     addQuery = document.getElementById('results').href + '?q=' +  searchVar;
    //     document.getElementById('results').href = addQuery;
    //   }
    // };
    // searchVariable();

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
    if (document.getElementById('time-greeting') !== null ) {
    document.getElementById('time-greeting').textContent = curMeridiem;
    }
  };loadDate();

  // change microphone to search icon

  setInterval (function check(){
    var checkInput = document.getElementById("sc-search-input-5fd0d311d1a5b55e574d3171");
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
  }, 1000);

 