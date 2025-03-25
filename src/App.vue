<template>
  <div id="app">
    <suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="loading-screen">
          <img src="@/assets/logo.png" alt="TaskGo" width="250" class="loader-img" />
          <img src="@/assets/loading.png" alt="loading" width="100" class="loader-img" />
        </div>
      </template>
    </suspense>
  </div>
</template>

<style>
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: #222222;
  color: #F5F5F5;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  flex-direction: column;
  text-align: center;
}

.loader-img {
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
