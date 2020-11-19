const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<body><h1> Empty String/</h1>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">SEND</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Body->", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        console.log(err);
        res.writeHead(302, { Location: "/" });
        return res.end();
      });
    });
  }
  //process.exit();
  res.setHeader("Content-Type", "text/html");
  res.end(); //After .end()  we should not write anymore on the response
  return res;
};

/*
module.exports = {
  handler: requestHandler,
  someText: "Text",
};
*/
exports.handler = requestHandler;
exports.someText = "Text";