<template>
  <div class="grid lg:grid-cols-2 sm:grid-cols-1  bg-red-500 mb-10 rounded w-full">
    <div class="flex ">
      <img class="w-24 ml-20 " src="../assets/logo.png" />
      <h1 class="text-center mt-5 text-white text-5xl font-mono">
        PROJETO POKEMON
      </h1>
    </div>

    <div class="flex justify-end h-10 mt-10 mb-2 mr-10">
      <input
        class="h-auto border-none border-red-500 rounded mr-5"
        type="text"
        placeholder="Pesquisar"
      />
      <button
        class=" pt-1 pb-1 pl-5 pr-5 rounded hover:bg-green-500"
      >
        <img class="w-5" src="../assets/search.png" />
      </button>
    </div>

  </div>
</template>
