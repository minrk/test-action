const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

const token = process.env["ACTIONS_RUNTIME_TOKEN"];
console.log(`Got token without asking for it: ${token.slice(0, 10)}...`);

console.log("env:");
console.log(process.env);

const options = {
  hostname: "api.github.com",
  port: 443,
  path: "/user",
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "User-Agent": "my-github-action",
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(`headers ${res.headers}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(`error! ${error}`);
  core.setFailed(error.message);
});
