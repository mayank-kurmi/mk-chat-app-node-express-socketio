const socket = io();
let UserName;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
let divUserName = document.querySelector("#userName");

do {
  UserName = prompt("Enter your name: ");
  divUserName.innerHTML = UserName;
} while (!UserName);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  if (message.trim().length > 0) {
    let msg = {
      user: UserName,
      message: message.trim(),
    };
    //! APPEND MESSAGE
    appendMessage(msg, "outgoing");
    textarea.value = "";
    scrollToBottom();
    socket.emit("message", msg);
  }
}

function appendMessage(msg, type) {
  // <h4>Mayank</h4>
  // <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium ipsam quibusdam voluptatibus
  // rem, doloribus rerum earum porro. Ut, corrupti esse?</p>
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `<h4>${msg.user}</h4>
                <p>${msg.message}</p>`;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve Message
socket.on("message", (msg) => {
  console.log(msg);
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
