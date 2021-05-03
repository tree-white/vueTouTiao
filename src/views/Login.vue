<template>
  <div class="L-page">
    <!-- 头部 -->
    <header class="header"></header>
    <!-- 主体 -->
    <div class="main">
      <div class="iconfont icon-guanbi"></div>
      <div class="iconfont icon-new"></div>
      <div class="login">
          <form action="#">
              <input class="username" type="text" placeholder="用户名 / 手机号码">
              <input class="password" type="password" placeholder="密码">
              <input class="submit" type="submit" value="登 录">
          </form>
      </div>
    </div>
    <!-- 尾部 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">

.L-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  height: 635px;
  border: 1px solid #ccc;
  margin: 100px auto;

  .header {
    height: 24px;
    background: rgba(117, 117, 117, 1);
  }

  .main {
    flex: 1;
    padding: 20px;

    .icon-guanbi {
        font-size: 24px;
    }

    .icon-new {
        font-size: 150px;
        text-align: center;
        padding: 20px;
        color:#c30;
    }

    .login {
        .username,.password {
            border: none;
            border-bottom: 1px solid black;
            padding: 10px 0 ;
            display: block;
            width: 100%;
            border-radius: 0;
            font-size: 18px;
            margin-bottom: 20px

        }

        .submit {
            width: 100%;
            height: 48px;
            border-radius: 24px;
            background: #c30;
            border: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            margin-top: 40px;
        }
    }
  }

  .footer {
    height: 48px;
    background: black;
  }
}
</style>