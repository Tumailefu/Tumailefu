<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";
export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  }
};
</script>

<style scoped>
.index {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  left: 180px;
  height: 100%;
}
</style>


