<script setup>
  import page from './../layouts/page.vue'
</script>

<template>
  <page>
    <template #page>
        <div class="mt-4 w-full inline-flex items-center justify-between ring-2 ring-primary-800 px-3 py-2 rounded-2xl bg-white">
          <h1 class="text-2xl font-semibold">mlAuth Documentation</h1>
        </div>

        <div class="mt-4 w-full px-3 py-2 rounded-2xl bg-white">
          <h2 class="text-xl font-bold">Table of contents</h2>
          <ul class="font-400 pl-4">
            <li>
              <a href="#creating-an-account">Creating an account</a>
            </li>
            <li>
              <a href="#generating-app-credentials">Generating app credentials</a>
            </li>
            <li>
              <a href="#the -authentication-flow">The authentication flow</a>
            </li>
            <li>
              <a href="#making-authentication-requests">Making authentication requests</a>
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

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h3 class="text-lg font-semibold" id="creating-an-account">Creating an account</h3>
          <p>
            To authenticate users in your project with magic links you need to first <router-link to="/register">create an account</router-link>.
          </p>
          <p>
            Together with your personal information, you will be requested to fill in the name of the app that will be using the magic link authentication service.
          </p>
          <p>
            You will receive an email on you registered email address, click the provided link to verify the account creation.
            On successfull login, you will be presented with the following dashboard.
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h3 class="text-lg font-semibold" id="generating-app-credentials">Generating app credentials</h3>
          <p>
            Inside your dashboard under the "My Apps" clink on the "Add Keys" button.
            Provide the following information: <br>
            <strong>callback URL</strong> - This is the url that mlAuth will be redirecting your users to after they click the magic links sent to them. <br>
            <strong>Life Span</strong> - This is the time in minutes which the magic links you will be sending to your users will take to expire. When not provided, we will assign a default 15 minutes duration. 
          </p>
          <p>
          On successfull generation, you will be presented with your <strong><i>Client Key</i></strong> and <strong><i>Client Secret</i></strong>. You will be using these two as per the following instructions. <br>
          </p>
          <p>
            <i><strong>IMPORTANT</strong>: Store the <strong>Client Secret</strong> somewhere safe as it will be displayed to you only once.</i>
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h3 class="text-lg font-semibold" id="the -authentication-flow">The authentication flow</h3>
          <p>
            Before proceeding to the next steps, we need to understand mlAuth's authentication flow so as we can properly integrate it in our apps. We'll break the flow to the following series of simple steps<br>
            <strong id="step-1">Step 1</strong>. A user arrives at your app's login page, they provide their email address and submit it. <br>
            <strong id="step-2">Step 2</strong>. Your login page makes a "login request" to mlAuth providing the user's email address. <br>
            <strong id="step-3">>Step 3</strong>. mlAuth sends a magic authentication link to the email provided in the login request. <br>
            <strong id="step-4">Step 4</strong>. The email recipient clicks the magic link and is redirect to the page in your app that was provided as the <strong>callbackUrl</strong> when you were <a href="#generating-app-credentials">generating app credentials</a>.
            <strong id="step-5">Step 5</strong>. You make a "login verification" request to mlAuth and either authenticate or reject the user access to your app.
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h3 class="text-lg font-semibold" id="making-authentication-requests">Making authentication requests</h3>
          <p>
            Now that we understand the authentication flow, we can start making requests to mlAuth. <br>
            From our apps, we need to make "login requests" as outlined on <a href="step-2">step 2</a> and "login verifications" as outlined on <a href="step-5">step 5</a>. <br>
            To automate this process, install the mlAuth npm package.
          </p>
          <p>
            <em>
              <code>
                npm install mlauth
              </code>
            </em>
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h4 class="font-semibold" id="making-login-requests">Making login requests</h4>
          <p>
            To make login requests with the assistance of the mlAuth npm package, we need to create an instance of mlAuth providing the <strong><i>client key</i></strong> and <strong><i>client secret</i></strong> we obtained while <a href="#generating-app-credentials">generating app credentials</a>.
          </p>
          <p>
            <em>
              <code>
                import mlAuth from "mlAuth"
                <br>
                const client = new mlAuth({
                  client: CLIENT_KEY,
                  secret: CLIENT_SECRET
                })
              </code>
            </em>
          </p>
          <p>
            Next, we proceed to making a login request, passing a valid email address as the sole argument.
          </p>
          <p>
            <em>
              <code>
                response = await client.login("email@domain.com");
              </code>
            </em>
          </p>
          <p>
            The request returns a Promise that resolves with a HTTP 201 response when successful or a corresponding error status otherwise.
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white">
          <h4 class="font-semibold" id="making-login-verification-requests">Making login verification requests</h4>
          <p>
            To verify login requests, you need to obtain a token query parameter passed as part of the callback url.
            Using the mlAuth npm package, you can verify it as follows. 
          </p>
          <p>
            <em>
              <code>
                response = await client.login(TOKEN);
              </code>
            </em>
          </p>
          <p>
            The request returns a Promise that resolves with a HTTP 201 response when successful or a corresponding error status otherwise.
          </p>
        </div>
    </template>
  </page>
</template>

<style>
p {
  margin-top: 1em;
}
ul {
  list-style: circle;
}
a{
  text-decoration: underline;
  color: #958b04
}
li > a {
  color: black;
  text-decoration: none
}
code{
  padding: 1em;
  font-size: 14px
}
</style>
