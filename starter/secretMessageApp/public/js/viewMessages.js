//CODE FROM JULY 21, 2021 (in-class + intermediate + spicy stretch goals)
let blocked = false;
let count = 0;
let passcodeButton = document.querySelector("#passcode");
/*const getMessages = () =>{
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(let key in data){
            const message = data[key];
            console.log(message);
            if(myPass == message.passcode){
                renderMessage(message);
            }
        }
    });
}*/

const findMessage = (myPass) =>{
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(let key in data){
            const message = data[key];
            console.log(message);
            if(myPass == message.passcode){
                renderMessage(message.message);
                count = 0;
                return;
            }
        }
        count = count + 1;
        if(count == 3)
        {
            blockUser();
        }
        else
        {
            renderMessage('Sorry! That is not a valid passcode!');
        }
    });
}

const renderMessage = (message) => {
    // Hide Input Form (see viewMessages.HTML)
    passcodeButton.value = '';
    // Render message as HTML
    const msg = document.querySelector('#message');
    msg.innerHTML = message;
}

function blockUser(){
    blocked = true;
    renderMessage('You have made 3 failed attempts in a row, and are therefore temporarily blocked from making an attempt. Please wait ten seconds before trying again.');
    setTimeout(unblockUser, 10000);
}

function unblockUser()
{
    blocked = false;
    count = 0;
}

document.querySelector("#viewMsg").addEventListener("click", ()=> {
    const passcode = passcodeButton.value;
    if(!blocked)
    {
        findMessage(passcode);
    }
});

/*//CODE FROM JULY 22, 2021
document.querySelector("#viewMsg").addEventListener("click", (e) => {
    const userPasscodeGuess = document.querySelector("#passcode").value;

    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(let key in data){
            if(userPasscodeGuess == data[key]){
                display(data[key]);
            }
        }
    });

    const display = (messageObject) =>{

    }
});*/