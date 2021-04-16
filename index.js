const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

async function run() {
  const token = process.env["ACTIONS_RUNTIME_TOKEN"];
  console.log(`Got token without asking for it: ${token.slice(0, 10)}...`);

  console.log("env:");
  console.log(process.env);

  const octokit = github.getOctokit(token);

  const { data, headers } = await octokit.request("/user");
  console.log(data);
  console.log(headers);
}

run();
