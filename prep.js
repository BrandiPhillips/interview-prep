$(document).ready( function() {
  var synth = window.speechSynthesis;

  var questions = ["Given a string, strip whitespace from it in-place",
  "Given a string, remove duplicate characters from it",
  "Given a string, reverse it",
  "Given a string with words separated by a space, reverse the words)",
  "Given an array of numbers, for each number find the product of all the other numbers",
  "Given a string, find if any permutation of the string is a palindrome",
  "Given an unsorted array with integers between 1 and 1,000,000, find the one integer that is in the array twice.",
  "Given an array, return the sum of the two largest integers",
  "Given an array, return the largest sum of contiguous integers",
  "Given an array of Strings, return the length of the longest string in the list.",
  "Given an array of Strings, write a method that replaces every string with two of that string",
  "Given an array of numbers, write a method that moves the minimum value in the list to the front, otherwise preserving the order of the elements.",
  "Given an array of Strings, write a method that that places a string of four asterisks in front of every string of length 4",
  "Write a method named rotateRight that accepts an array of integers as a parameter and rotates the values in the array to the right (increases index) by one. The last value should become the first index",
  "Write a method evens that accepts an integer parameter n and that returns the integer formed by removing the odd digits from n.",
  "Write a method starString that accepts an integer parameter n and returns a string of stars (asterisks) 2n long (i.e., 2 to the nth power)",
  "Write a method removeFront that takes an integer n as a parameter and that removes the first n values from a list of integers.",
  "Write a function named isPangram that accepts a string and returns true if the string is a pangram. A pangram is any phrase that contains at least one of each of the 26 letters in the English alphabet (ignoring letter-casing)",
  "Write a function named vowelCount that accepts a string and returns the number of vowels (a, e, i, o, or u) that the string contains."

];

  var number = Math.floor((Math.random() * questions.length));

  var currentQuestion = null;

  var currentTime = null;
  var examples = ["H e  llo W orl     d ==> HelloWord",
  "AAA BBB ==> A B",
  "Hello ==> olleH",
  "This is stuff ==> stuff is This",
  "[1,2,3,4,5] ==> [14, 13, 12, 11, 10]",
  "aggppa ==> agppga (true)",
  "[1,2,345,213...2,23543] ==> 2",
  "[1,5,6,9,23,2] ==> 32",
  "[24,67,12,1,6,3] ==> 91"
  ];

  $(".repeat, .show-example, .stop, .next").hide();

  var sayQuestion = function() {
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    utterThis.rate = 0.8;
    synth.speak(utterThis);
  };

  var getQuestion = function() {
    $(".show-example").show();
    $(".example-text").html("");
    $(".recorded-time").hide();

    if (number === (questions.length - 1)) {
      number = 0;
    }
    else {
      number += 1;
    }

    currentTime = Date.now(); //in milliseconds
    sayQuestion();
  };

  var showTimer = function(){
    var stopTime = Date.now();
    var duration = stopTime - currentTime;
    var milliseconds = parseInt((duration%1000)/100);
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var time = hours + ":" + minutes + ":" + seconds + "." + milliseconds;

    $(".recorded-time").html("<p>" + time + "</p>");
    $(".recorded-time").show();
  };

  var showExample = function() {
    $(".show-example").hide();
    $(".example-text").html("<p>" + examples[number] + "</p>");
  };

  $(".start").click(function(){
    sayQuestion();
    currentTime = Date.now(); //in milliseconds

    $(".start, .recorded-time").hide();
    $(".next, .repeat, .show-example, .stop").show();
  });

  $(".show-example").click(function() {
    showExample();
  });

  $(".next").click(function(){
    getQuestion();
  });

  $(".repeat").click(function() {
    sayQuestion();
  });

  $(".stop").click(function() {
    showTimer();
  });

  $("body").keydown(function(e) {
    if (e.key === " ") {
      showTimer();
    }
    else if (e.keyCode === 39) {
      getQuestion();
    }
    else if (e.keyCode === 37) {
      sayQuestion();
    }
    else if (e.keyCode === 40){
      showExample();
    }
  });

});
