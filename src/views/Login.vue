<template>
  <div class="L-page">
    <div class="main">
      <div class="iconfont icon-guanbi" @click="$router.replace(return_url || '/')"></div>
      <div class="iconfont icon-new"></div>
      <!-- 使用 vant 表单 -->
      <!-- van-form是表单的组件,@submit是表单按钮提交的事件 -->
      <van-form submit-on-enter @submit="onSubmit" class="form">
        <!-- van-field是表单的字段 -->
        <!-- rules是表单字段的规则，required=true 表示这个输入框是必填 -->
        <!-- message 则如果每天弹出的信息 -->
        <van-field
          v-model="form.username"
          name="username"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <!-- 密码输入框，和上面的属性是一样的 -->
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <!-- 如果这个按钮是子啊 van-form 组件内部.
             并且按钮的 native-type="submit" 说明点击这个按钮就会触发 submit 事件-->
        <div>
          <van-button round block type="info" native-type="submit"
            >登 录</van-button
          >
        </div>
      </van-form>

      <router-link to="/register">
        <div class="register">
          <van-button round block type="info" native-type="submit"
            >注 册</van-button
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){

  },

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      return_url: this.$route.query.return_url,
    };
  },
  methods: {
    // 提交表单时候触发的事件，该事件通过校验才会触发
    // values是表单返回的值,这里的values用不上,数据可以在this.form里面获取
    // 也可以修改 name值,就可以直接使用 values
    onSubmit(values) {
      // 点击登录发送数据
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      this.$axios({
        url: "/login",
        method: "POST",
        data: values,
      }).then((response) => {
        // 解构出登录信息
        const { data: loginData } = response.data;
        // 登录成功把登录时写的密码也传到loginData数据中
        loginData.user.password = this.form.password;
        // 把用户登录信息存储到本地
        localStorage.setItem("userInfo", JSON.stringify(loginData));
        // 提示登录成功
        this.$toast.success("登录成功");

        // 判断地址栏有没有(return_url)参数，有则跳转到这个路径，没有则跳转用户中心(user)

        this.$router.replace(this.return_url || "/user");
      });
    },
  },
};
</script>

<style scoped lang="less">
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
  }

  .form {
    .van-cell {
      padding: (10 / 360 * 100vw) 0;
      font-size: 16px;
      margin-top: 10 / 360 * 100vw;
    }

    .van-button--info {
      background: @color_red;
      border: @color_red;
      margin-top: 40 / 360 * 100vw;
    }
  }

  .register {
    .van-button--info {
      background-color: #fff;
      border: 1px solid #ccc;
      color: black;
      margin-top: 10 / 360 * 100vw;
    }
  }
}
</style>