const app = require("./app"); // Import app.js
const http = require("http");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
