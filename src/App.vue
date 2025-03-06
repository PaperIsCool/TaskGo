<template>
  <div id="app">
    <div v-if="loading" class="loading-screen">
      <img src="@/assets/loader.png" alt="loading" width="100" class="loader-img" />
      <h1>Please wait...</h1>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: true
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.loading = true;
      next();
    });

    this.$router.afterEach(() => {
      this.loading = false;
    });
  }
};
</script>

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
