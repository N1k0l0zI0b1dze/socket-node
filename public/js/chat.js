const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const usernameInput = document.getElementById("usernameInput");
const setUsernameBtn = document.getElementById("setUsernameBtn");

const socket = io();

let username = ""; // user will set this

// Random color map
const userColors = {};

// Format time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Set username
setUsernameBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    usernameInput.disabled = true;
    setUsernameBtn.disabled = true;
    console.log("✅ Username set to:", username);
  }
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!username) {
    alert("Please set your username first!");
    return;
  }

  if (input.value) {
    socket.emit("chat message", { username, msg: input.value });
    input.value = "";
  }
});

// Receive message
socket.on("main message", (data) => {
  const { username: msgUser, msg } = data;

  const item = document.createElement("li");

  if (!userColors[msgUser]) {
    userColors[msgUser] =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  item.innerHTML = `<strong style="color:${
    userColors[msgUser]
  }">${msgUser}</strong>: ${msg} <span class="timestamp">${getTime()}</span>`;
  messages.appendChild(item);

  messages.scrollTop = messages.scrollHeight;
});
