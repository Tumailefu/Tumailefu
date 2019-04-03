<template>
  <header class="head-nav">
    <el-row>
      <el-col
        :span='6'
        class="logo-container"
      >
        <img
          src="../assets/logo.png"
          alt=""
          class="logo"
        >
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col
        :span='6'
        class="user"
      >
        <div class="userinfo">
          <img
            :src="user.avatar"
            alt=""
            class="avatar"
          >
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='userinfo'>个人信息</el-dropdown-item>
                <el-dropdown-item command='logout'>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    handleCommand(command) {
      // this.$message(command)
      switch (command) {
        case "userinfo":
          this.showUserinfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showUserinfo(){
     this.$router.push('./infoshow')
    },
    logout(){
      localStorage.removeItem('eleToken')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.avatarname {
  color: #4049efff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown-link {
  color: white;
}
</style>


