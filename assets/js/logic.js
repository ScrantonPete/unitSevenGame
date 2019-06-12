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

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

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

$("#add-train").on("click", function() {
  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
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

  var startTimeConverted = moment(startTime, "hh:mm").subtract("1, years");

  var difference = currentTime.diff(moment(startTimeConverted), "minutes");
  var remainder = difference % frequency;
  var minutesAway = frequency - remainder;
  var nextArrival = moment()
    .add(minutesAway, "minutes")
    .format("hh:mm a");

  var newTrain = {
    train: train,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
    min: minutesAway,
    next: nextArrival
  };

  // Code for the push
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
