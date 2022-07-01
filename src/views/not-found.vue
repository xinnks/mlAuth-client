<template>
  <div class="flex flex-col space-y-4 justify-center min-h-[100vh]">
    
    <div class="flex justify-center items-center space-x-4 p-8 filter grayscale">
      <img alt="mlAuth logo" class="w-24 self-center" src="./../assets/mlAuth.svg" />
      <div>
        <h1 class="text-6xl fonr-bold">404</h1>
      </div>
    </div>

    <p class="mx-auto p-4 text-2xl text-slate-600 font-semibold">
      Not Again.. <span class="text-3xl">🤦</span>
    </p>

    <p class="mx-auto p-4 text-2xl text-slate-600 font-semibold">
      <router-link to="/">let's head back home 🏠.</router-link>
    </p>
    
  </div>
</template>