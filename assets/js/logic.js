// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCGOWVBIdOQ0yXOTMVVNlF7ekirnW493XU",
  authDomain: "unitsevengame.firebaseapp.com",
  databaseURL: "https://unitsevengame.firebaseio.com",
  projectId: "unitsevengame",
  storageBucket: "unitsevengame.appspot.com",
  messagingSenderId: "188549828480",
  appId: "1:188549828480:web:11201b77a4788cf2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Reference to the database we're writing to.
var database = firebase.database();
var currentTime = moment();

// Create Firebase event for adding train to the database and a row in the html when a user
// adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // Store data in variables

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var startTime = childSnapshot.val().startTime;
  var frequency = childSnapshot.val().frequency;
  var min = childSnapshot.val().min;
  var next = childSnapshot.val().next;

  console.log(train);
  console.log(destination);
  console.log(startTime);
  console.log(frequency);

  // Creates the new Row of data

  $("#train-table > tbody").append(
    "<tr><td>" +
      train +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      next +
      "</td><td>" +
      min +
      "</td></tr>"
  );
});

database.ref().on("value", function(snapshot) {});

// Plays sound when button is clicked
var audio = new Audio("assets/images/trainWhistle.mp3");
$("#add-train").click(() => audio.play());

// Inputting new train, checks to ensure entry in each field

$("#add-train").on("click", function() {
  var train = $("#train-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var startTime = $("#startTime-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  if (train == "") {
    alert("Enter a Train.");
    return false;
  }

  if (destination == "") {
    alert("Enter a Destination.");
    return false;
  }

  if (startTime == "") {
    alert("Enter a Start Time.");
    return false;
  }
  if (frequency == "") {
    alert("Enter a Frequency.");
    return false;
  }

  //   Math formulas for nextArrival and minutesAway
  var startTimeConverted = moment(startTime, "hh:mm").subtract("1, years");

  var difference = currentTime.diff(moment(startTimeConverted), "minutes");
  var remainder = difference % frequency;
  var minutesAway = frequency - remainder;
  var nextArrival = moment()
    .add(minutesAway, "minutes")
    .format("hh:mm a");

  // New train entered into a variable with properties defined
  var newTrain = {
    train: train,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
    min: minutesAway,
    next: nextArrival
  };

  // Code for the push to firebase
  database.ref().push(newTrain);
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#startTime-input").val("");
  $("#frequency-input").val("");

  return false;
});
