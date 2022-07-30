<template>
  <div class="flex flex-col space-y-4 justify-center min-h-[100vh] dark:bg-gray-800 dark:text-white">
    
    <div class="flex flex-col justify-center items-center space-x-4 p-8">
      <img alt="mlAuth logo" class="w-48 self-center" src="./../assets/mlAuth.svg" />
      <div>
        <h1 class="text-6xl font-bold">mlAuth</h1>
      </div>
    </div>

    <p class="mx-auto p-4 text-2xl text-slate-600 dark:text-white font-semibold">
      You build,
      we'll authenticate.
    </p>

    <div class="flex justify-center mt-8 p-4 space-x-2">
      <router-link to="/login" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
        <span>Login</span>
      </router-link>
      <router-link to="/register" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
        <span>Register</span>
      </router-link>
      <router-link to="/docs" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
        <span>Documentation</span>
      </router-link>
    </div>
  </div>
</template>