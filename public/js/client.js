const socket = io();

socket.on("connect", () => {
  console.log("Connect to server, id:", socket.id);
});

// Custom message from server
socket.on("message", (message) => {
  console.log("📩", message);
  const messagesDiv = document.getElementById("messages");
  const p = document.createElement("p");
  p.textContent = message;
  messagesDiv.appendChild(p);
});

socket.on("disconnect", () => {
  console.log("Disconmected from server");
});

// Disconnect button
document.getElementById("disconnectBtn").addEventListener("click", () => {
  socket.disconnect();
});

// Reconnect button
document.getElementById("reconnectBtn").addEventListener("click", () => {
  socket.connect();
});
