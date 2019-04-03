<template>
  <div class="home">
    <div class="container">
      <h1 class='title'>后台管理系统</h1>
      <p class="lead ">Get vector icons and social logos on your website with Font Awesome, the web's most popular icon set and toolkit.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/rain_win.jpg) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  text-align: center;
  margin: 50px 300px;

  font-size: 22px;
}
</style>

