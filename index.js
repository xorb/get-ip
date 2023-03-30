const http = require("http");
const PORT = process.env.PORT || 8080;

const options = {
  hostname: "checkip.amazonaws.com",
  path: "/",
  method: "GET",
};

const makeHttpRequest = (options) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    const ip = await makeHttpRequest(options);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(ip);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
