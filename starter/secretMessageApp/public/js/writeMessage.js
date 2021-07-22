const messagesRef = firebase.database().ref();

messagesRef.push({
    message: "This was made with JavaScript",
    passcode: "JavaScript"
});