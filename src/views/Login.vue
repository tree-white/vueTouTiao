<template>
  <div class="L-page">

    <div class="main">
      <div class="iconfont icon-guanbi"></div>
      <div class="iconfont icon-new"></div>
      <div class="login">
        <input class="username" type="text" placeholder="用户名 / 手机号码" v-model="form.username"> {{form.username}} {{form.password}}
        <input class="password" type="password" placeholder="密码" v-model="form.password">
        <input class="submit" type="submit" value="登 录" @click="handleClick">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 点击登录按钮的时间
    handleClick(){
      // this.$axios({
      //   url: 'http://127.0.0.1:3000/login',
      //   method: 'POST',
      //   data: this.form
      // }).then(response => {
      //   console.log(response);
      // })
    }
  }
};
</script>

<style lang="less">
@color_red: #c30;

.L-page {
  padding: (20 / 360 * 100vw);
  // display: flex;


  .main {

    .icon-guanbi {
        font-size: 24 / 360 * 100vw;
    }

    .icon-new {
        font-size: 126 / 360 * 100vw;
        text-align: center;
        margin: 20 / 360 * 100vw;
        color: @color_red;
    }

    .login {
        .username,.password {
            border: none;
            border-bottom: 1px solid black;
            padding: (10 / 360 * 100vw) 0 ;
            display: block;
            width: 100%;
            border-radius: 0;
            font-size: 16px;
            margin-bottom: 20 / 360 * 100vw;
        }

        .submit {
            width: 100%;
            height: 48 / 360 * 100vw;
            border-radius: 24 / 360 * 100vw;
            background: @color_red;
            border: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            margin-top: 40 / 360 * 100vw;
        }
    }
  }

}
</style>