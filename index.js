const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

async function run() {
  const token = core.getInput("token");
  console.log(`Got token: ${token.slice(0, 10)}...`);
  const env = core.getInput("env");
  console.log(`Got env: ${env}`);

  console.log("process env:");
  console.log(process.env);

  const octokit = github.getOctokit(token);

  try {
    const { data, headers } = await octokit.request("/user");
    console.log(data);
    console.log(headers);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
  }
}

run();
