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

$("#add-train").on("click", function(event) {
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  train = $("#train-input")
    .val()
    .trim();
  destination = $("#destination-input")
    .val()
    .trim();
  startTime = $("#startTime-input")
    .val()
    .trim();
  frequency = $("#frequency-input")
    .val()
    .trim();
  console.log(train);
  console.log(destination);
  console.log(startTime);
  console.log(frequency);

  // Code for the push
  database.ref().push({
    train: train,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().on("child_added", function(snapshot) {
  if (snapshot.exists()) {
    var content = "";
    var val = snapshot.val();
    content += "<tr>";
    content += "<td>" + val.train + "</td>";
    content += "<td>" + val.destination + "</td>";
    content += "<td>" + val.startTime + "</td>";
    content += "<td>" + val.frequency + "</td>";
    content += "</tr>";
    $("#populateData").append(content);
  }
});
