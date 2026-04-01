import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

// instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// dirname fix for ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// set EJS as view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// serve static files (js, css, images…)
app.use(express.static(join(__dirname, "public")));

// routing
app.get("/", (req, res) => {
  res.render("index", { title: "Socket.IO Demo" });
});

io.on("connection", (socket) => {
  console.log("User Connected, Server: ", socket.id);

  socket.emit("message", "Welcome to the server");

  io.emit("message", "Attention ALL! New member just joined");

  socket.on("disconnect", () => {
    console.log("User Disconnected : ", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
