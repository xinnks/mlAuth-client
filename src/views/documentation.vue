<script setup>
  import page from './../layouts/page.vue'
</script>

<template>
  <page>
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zm-2 3V4H4v15a1 1 0 0 0 1 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"/></svg>
    </template>
    <template #title>Documentation</template>
    <template #page>

        <div class="mt-4 w-full px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
          <h2 class="text-xl font-bold">Table of contents</h2>
          <ul class="font-400 pl-4 dark:text-primary">
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

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800 dark:bg-gray-800">
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

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold" id="generating-app-credentials">Generating app credentials</h3>
          <p>
            Inside your dashboard under the "My Apps" clink on the "Add Keys" button.
            Provide the following information: <br>
            <strong>callback URL</strong> - This is the url that mlAuth will be redirecting your users to after they click the magic links sent to them. <br>
            <strong>Life Span</strong> - This is the time in minutes which the magic links you will be sending to your users will take to expire. When not provided, we will assign a default 30 minutes limit. 
          </p>
          <p>
          On successfull generation, you will be presented with your <strong><i>Client Key</i></strong> and <strong><i>Client Secret</i></strong>. You will be using these two as per the following instructions. <br>
          </p>
          <p>
            <i><strong>IMPORTANT</strong>: Store the <strong>Client Secret</strong> somewhere safe as it will be displayed to you only once.</i>
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
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

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold" id="making-authentication-requests">Making authentication requests</h3>
          <p>
            Now that we understand the authentication flow, we can start making requests to mlAuth. <br>
            From our apps, we need to make "login requests" as outlined on <a href="step-2">step 2</a> and "login verifications" as outlined on <a href="step-5">step 5</a>. <br>
            To automate this process, install the <a href="npmjs.com/package/mlauth-js"><strong>mlauth-js</strong></a> npm package.
          </p>
          <p>
            <em>
              <code>
                npm install mlauth-js
              </code>
            </em>
          </p>
        </div>

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
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

        <div class="mt-4 w-full ring-1 ring-gray-100 px-3 py-2 rounded-2xl bg-white dark:bg-gray-800">
          <h4 class="font-semibold" id="making-login-verification-requests">Making login verification requests</h4>
          <p>
            To verify login requests, you need to obtain a token query parameter passed as part of the callback url.
            Using the mlauth-js npm package, you can verify it as follows. 
          </p>
          <p>
            <em>
              <code>
                response = await client.login(TOKEN);
              </code>
            </em>
          </p>
          <p>
            The login verification request returns a Promise that resolves with a HTTP 200 response when successful or a corresponding status code otherwise. Successfull requests are accompanied with information about the created magic link.
          </p>
        </div>
    </template>
  </page>
</template>

<style scoped>
p {
  margin-top: 1em;
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
