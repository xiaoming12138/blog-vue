<template>
  <div class="header-main">
    <div class="app-container header-box">
      <!-- 左边导航 -->
      <div class="header-left">
        <router-link to="/">
          <img class="logo-img" src="../assets/logoNew.png" alt="logo" srcset="" />xiaoming
        </router-link>
        <ul class="header-nav app-hide-xs">
          <router-link to="/">
            <li class="header-nav-item">
              <a href="javascript:;">首页</a>
            </li>
          </router-link>
          <li class="header-nav-item">
            <a href="javascript:;"><i class="iconfont icon-jiaoliu" />交流</a>
          </li>
          <li class="header-nav-item">
            <a href="javascript:;"
              ><i class="iconfont icon-iconmingxinganli" />案例</a
            >
          </li>
          <li class="header-nav-item">
            <a href="javascript:;"><i class="iconfont icon-ui" />框架</a>
          </li>
        </ul>
      </div>
      <!-- 右边导航 -->
      <div class="header-right">
        <ul class="header-nav">
          <template v-if="!isLogin">
            <li class="header-nav-item">
              <a class="avatar app-hide-xs" href="javascript:;"
                ><i class="iconfont icon-touxiang"
              /></a>
            </li>
            <li class="header-nav-item">
              <router-link class="login" to="/login">登录</router-link>
            </li>
            <li class="header-nav-item">
              <router-link class="login" to="/login">注册</router-link>
            </li>
          </template>
          <template v-else>
            <li class="header-nav-item">
              <!--  -->
              <a-dropdown>
                <router-link to="/center" class="avatar">
                  <img
                    class="login-avatar"
                    :src="
                      env === 'development'
                        ? config.baseUrl.dev + userInfo.pic
                        : config.baseUrl.prod + userInfo.pic
                    "
                    alt=""
                  />
                  {{ userInfo.nickName }}
                  <a-badge
                    v-show="noReadNum && noReadNum > 0"
                    :count="noReadNum"
                    style="margin-left: 10px"
                  />
                </router-link>
                <a-menu slot="overlay" @click="onClickMenu">
                  <a-menu-item key="info" disabled>
                    欢迎用户：{{ userInfo.nickName }}
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="baseInfo">
                    <a href="javascript:;"
                      ><a-icon type="database" />基本信息</a
                    >
                  </a-menu-item>
                  <a-menu-item key="message">
                    <a href="javascript:;"><a-icon type="message" />我的消息</a>
                  </a-menu-item>
                  <a-menu-item key="my">
                    <a href="javascript:;"><a-icon type="home" />我的主页</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">
                    <a href="javascript:;">安全退出</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 头部导航组件
 */
import { mapState, mapMutations } from "vuex";
import config from "@/config";
export default {
  name: "Header",
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo", "noReadNum"]),
  },
  methods: {
    ...mapMutations(["SET_USERINFO", "SET_LOGIN", "SET_TOKEN"]),
    onClickMenu({ key }) {
      if (key === "baseInfo") {
        // 基本信息
        this.$router.push({ name: "UserCenter" });
      } else if (key === "message") {
        // 我的消息
        this.$router.push({ name: "Message" });
      } else if (key === "my") {
        // 我的主页
        this.$router.push({ name: "User", params: { id: this.userInfo._id } });
      } else if (key === "logout") {
        // 安全退出
        this.SET_USERINFO({});
        this.SET_LOGIN(false);
        this.SET_TOKEN("");
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-main {
  background-color: #393d49;
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 1px;
  border-bottom: 1px solid #404553;
  border-right: 1px solid #404553;
  border-radius: 0;
  .header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .header-left {
      display: flex;
      align-items: center;
      .logo-img{
        display: inline-block;
        width: 49px;
        height: 49px;
        // background: url('../assets/logoNew.png') no-repeat center;
        // background-size: contain;
        vertical-align: middle;
        margin-right: 10px;
        image-rendering:-moz-crisp-edges;
        image-rendering:-o-crisp-edges;
        image-rendering:-webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode:nearest-neighbor;
        object-fit: fill; 
 object-fit: contain;
 object-fit: scale-down;
      }
    }
    .header-right {
      .header-nav {
        .header-nav-item {
          .login,
          .register {
            padding: 0 25px 0 0;
          }
          .avatar {
            i {
              font-size: 32px;
            }
            .login-avatar {
              width: 36px;
              height: 36px;
              margin: 0 10px;
              border-radius: 100%;
            }
          }
        }
      }
    }
    // 导航公共样式
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      .header-nav-item {
        a {
          padding: 0 25px 0 60px;
          display: block;
          height: 60px;
          line-height: 60px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          position: relative;
          &:hover {
            color: #fff;
          }
          i {
            position: absolute;
            left: 25px;
            padding-right: 10px;
            font-size: 26px;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ant-dropdown-menu-item {
  i {
    margin-right: 10px;
  }
}
.iconfont.icon-home{
  background: url('../assets/icon-home.png') no-repeat center;
}
.ant-dropdown-menu-item:hover,
.ant-dropdown-menu-submenu-title:hover {
  background-color: #009688;
  a {
    color: #fff;
  }
}
.ant-dropdown-menu-item-disabled:hover,
.ant-dropdown-menu-submenu-title-disabled:hover {
  background: #fff;
}
</style>
