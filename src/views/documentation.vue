<script setup>
import PublicPage from "./../layouts/publicPage.vue";
</script>

<template>
  <public-page>
    <div class="px-5 md:px-16 xl:px-24 py-24 bg-white dark:bg-gray-800 dark:text-white">

      <div class="mt-4 w-full px-3 py-2">
        <h1 class="text-3xl xl:text-4xl font-bold">Documentation</h1>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h2 class="text-xl xl:text-2xl font-bold">Table of contents</h2>
        <ul class="font-400 pl-4 dark:text-primary">
          <li>
            <a href="#creating-an-account">Creating an account</a>
          </li>
          <li>
            <a href="#creating-apps">Creating apps</a>
          </li>
          <li>
            <a href="#generating-new-app-credentials">Generating new app credentials</a>
          </li>
          <li>
            <a href="#the -authentication-flow">The authentication flow</a>
          </li>
          <li>
            <a href="#authentication-preparation">Preparing a project for mlAuth authentication requests</a>
            <ul class="pl-4">
              <li>
                <a href="#making-login-requests">Making login requests</a>
              </li>
              <li>
                <a href="#making-login-verification-requests">Making login verification requests</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h3 class="text-lg xl:text-xl font-semibold" id="creating-an-account">Creating an account</h3>
        <p>
          To authenticate users in your project with magic links you need to first <router-link to="/register">create an account</router-link>.
        </p>
        <p>
          You will receive a confirmation email on you registered email address, click the provided link to verify the account.
          On successful login, you will be directed to your dashboard.
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h3 class="text-lg xl:text-xl font-semibold" id="creating-apps">Creating Apps</h3>
        <p>
          Inside your dashboard under the "My Apps" clink on the "New App" button.
          Provide the following information: <br>
          <strong>App Name</strong> - This is the name of your app,. Two apps can't have the same name.
          <strong>callback URL</strong> - This is the url that mlAuth will be redirecting your users to after they open the magic links sent to them. <br>
          <strong>Magic Link Timeout</strong> - This is the time in milliseconds which the magic links that will be sent to your users will take to expire. When not provided, we will assign a default 1800000 (30 minutes) limit.
          <strong>App Environment</strong> - This is your app's environment, it is set to development by default.
        </p>
        <p>
          On successful app creation, you will be presented with your <strong><i>Client</i></strong> and <strong><i>Secret</i></strong> Keys. You will be using these two keys to authenticate your apps requests to mlAuth as per the following instructions. <br>
        </p>
        <p>
          <i><strong>IMPORTANT</strong>: Store the <strong>Secret</strong> key somewhere safe as it will be displayed to you only once.</i>
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h3 class="text-lg xl:text-xl font-semibold" id="generating-new-app-credentials">Regenerating app credentials</h3>
        <p>
          When you need to change your app's keys, for any personal reason, or because your previous keys were used in an insecure request for the case of a production app. You need to click the "Change Keys" button inside your app's details card.
          <br>
          When the new keys have been generated for your app, do not forget to store the secret somewhere, as you'll only see it once.
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h3 class="text-lg xl:text-xl font-semibold" id="the -authentication-flow">The authentication flow</h3>
        <p>
          Before proceeding to the next steps, we need to understand mlAuth's authentication flow so we can properly integrate it in our apps. We'll break the flow to the following series of simple steps<br>
          <strong id="step-1">Step 1</strong>. A user arrives at your app's login page, they provide their email address and submit it. <br>
          <strong id="step-2">Step 2</strong>. Your login page makes a "login request" to mlAuth providing the user's email address. <br>
          <strong id="step-3">Step 3</strong>. mlAuth sends a magic authentication link to the email provided in the login request. <br>
          <strong id="step-4">Step 4</strong>. The email recipient opens the magic link and is redirect to the page in your app that was provided as the <strong>callbackUrl</strong> when you were <a href="#creating-apps">creating your app</a>.
          <strong id="step-5">Step 5</strong>. You make a "magic link verification" request to mlAuth, where you will either receive the magic link with further details concerning the request or a failed response. You then decide to either authenticate or reject the user access to your app.
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h3 class="text-lg xl:text-xl font-semibold" id="authentication-preparation">Preparing a project for mlAuth authentication requests.</h3>
        <p>
          Now that we understand the authentication flow, we can set our projects up for making authentication requests to mlAuth. <br>
        </p>
        <p>
          To automate this process, install mlAuth's JavaScript client - <a href="https://npmjs.com/package/mlauth-js"><strong>mlauth-js</strong></a>.
        </p>
        <p>
          <em>
            <code>
              npm install mlauth-js
            </code>
          </em>
        </p>
        <p>
          Before we can start to make login requests to mlAuth, we need to first import the package.
        </p>
        <p>
          In your front-end projects.
        </p>
        <p>
          <em>
            <code>
              import mlAuth from "mlAuth"
            </code>
          </em>
        </p>
        <p>
          In NodeJs.
        </p>
        <p>
          <em>
            <code>
              const mlAuth = require('mlauth-js')
            </code>
          </em>
        </p>
        <p>
          Next, proceed to creating an instance of mlAuth, providing your apps credentials, the <strong><i>Client</i></strong> and <strong><i>Secret</i></strong> keys we obtained above..
        </p>
        <p>
          <em>
            <code>
              const client = new mlAuth({
              client: CLIENT_KEY,
              secret: SECRET_KEY
              })
            </code>
          </em>
        </p>
        <p>
          Now we are set to make "login" and "magic link verification" requests as outlined on <a href="step-2">step 2</a> and <a href="step-5">step 5</a> respectively.
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h4 class="text-lg xl:text-xl font-semibold" id="making-login-requests">Making login requests</h4>
        <p>
          The mlAuth instance provides a login() function that takes an email string as the sole argument, pass your user's email here and wait for the response.
        </p>
        <p>
          <em>
            <code>
              const response = await client.login(EMAIL);
            </code>
          </em>
        </p>
        <p>
          The request returns a Promise that when successful resolves with an Object containing a <strong>data</strong> Object that contains the details of the created magic link, and a <strong>message</strong> String that contains the message of what happened are returned in the response payload.
        </p>
        <p>
          On failure, an error is thrown with a <strong>message</strong> string that detailing what went wrong.
        </p>
      </div>

      <div class="mt-4 w-full px-3 py-2">
        <h4 class="text-lg xl:text-xl font-semibold" id="making-login-verification-requests">Making login verification requests</h4>
        <p>
          When a user opens the magic link provided in the email sent to them, they will be redirected to the route specified on the callbackUrl field you provided while creating your app.
          <br>
          To verify magic links, you need to first obtain the token which is passed as a query named 'token' on the callback url.
          Then proceed to verifying that token using the verify() method of the previously created mlAuth instance.
        </p>
        <p>
          <em>
            <code>
              const response = await client.verify(TOKEN);
            </code>
          </em>
        </p>
        <p>
          The verification request returns a Promise that when successful, resolves with an Object with two properties, a <strong>magicLink</strong> Object that contains the details of the magic link, the magic link's properties contain the email of the user that the magic link was sent to, the secong property is a <strong>message</strong> String that contains the message detailing what happened.
        </p>
        <p>
          On failure, an error is thrown with a <strong>message</strong> string that detailing what went wrong.
        </p>
      </div>
    </div>
  </public-page>
</template>

<style scoped>
p {
  margin-top: 1em;
  padding: 0.5em 0 0.5em
}
ul {
  list-style: circle;
}
a{
  text-decoration: underline;
}
li > a {
  text-decoration: none
}
code{
  padding: 1em;
  font-size: 14px
}
</style>
