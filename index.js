const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const token = core.getInput('token');
  const secret = core.getInput('secret');
  if (token) {
      console.log(`Got token: ${token.slice(0, 3)}...`)
  } else {
      console.log("Got no token");
  }
  if (secret) {
      console.log(`Got secret: ${secret.slice(0, 3)}...`)
  } else {
      console.log("Got no secret");
  }
  core.setOutput("token", token.slice(0, 5));
  core.setOutput("secret", secret.slice(0, 5));
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log(process.env);
} catch (error) {
  core.setFailed(error.message);
}
