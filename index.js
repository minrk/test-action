const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

async function run() {
  const token = process.env["ACTIONS_RUNTIME_TOKEN"];
  console.log(`Got token without asking for it: ${token.slice(0, 10)}...`);

  console.log("env:");
  console.log(process.env);

  const octokit = github.getOctokit(token);

  try {
      const { data, headers } = await octokit.request("/");
  console.log(data);
  console.log(headers);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
  }
}

run();
