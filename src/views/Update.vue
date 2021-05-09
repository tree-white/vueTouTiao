<template>
  <div class="updatePage">
    <!-- 头部标题 -->
    <Titlebar title="编辑资料" showBack="true" />

    <!-- 头像 -->
    <div class="cover">
      <div class="cover-size">
        <van-image
          class="icon-cover"
          fit="cover"
          radius="50%"
          :src="$axios.defaults.baseURL + userData.head_img"
        />
      </div>
      <van-uploader
        :after-read="afterRead"
        class="uploadCover"
        style="opacity: 0"
      />
    </div>

    <!-- 修改昵称 -->
    <Listbar
      label="昵称"
      :tips="userData.nickname"
      @click.native="handleEditNickname"
    />
    <!-- vant组件 - Dialog弹出框-->
    <!-- cancel=按下取消 / confirm=按下确定 -->
    <van-dialog
      v-model="nicknameEdit.show"
      title="修改昵称"
      show-cancel-button
      @cancel="nicknameEdit.nickname = ''"
      @confirm="handleEditUserData({ nickname: nicknameEdit.nickname })"
    >
      <!-- vant组件 - field输入框 -->
      <van-cell-group>
        <van-field
          v-model="nicknameEdit.nickname"
          :placeholder="userData.nickname"
        />
      </van-cell-group>
    </van-dialog>

    <!-- 修改密码 -->
    <Listbar label="密码" tips="******" @click.native="handleEditPassword" />
    <!-- vant组件 - Dialog弹出框-->
    <!-- cancel=按下取消 / confirm=按下确定 -->
    <van-dialog
      v-model="passwaodEdit.show"
      title="修改密码"
      show-cancel-button
      @confirm="handleCheckEditPassword"
    >
      <br />
      <van-field
        v-model="passwaodEdit.oldPwd"
        label="旧密码"
        type="password"
        label-align="right"
        placeholder="请输入旧密码"
        clearable
      />
      <br />
      <van-field
        v-model="passwaodEdit.newPwd"
        label="新密码"
        type="password"
        label-align="right"
        placeholder="请输入新密码"
        clearable
      />
      <van-field
        v-model="passwaodEdit.againPwd"
        label="再输入密码"
        type="password"
        label-align="right"
        placeholder="请再次输入新密码"
        clearable
      />
      <br />
    </van-dialog>

    <!-- 修改性别 -->
    <Listbar
      label="性别"
      :tips="['女', '男'][userData.gender]"
      @click.native="handleEditGender"
    />
    <!-- vant组件 - Dialog弹出框-->
    <!-- cancel=按下取消 / confirm=按下确定 -->
    <van-dialog
      v-model="genderEdit.show"
      title="修改性别"
      show-cancel-button
      @confirm="handleEditUserData({ gender: genderEdit.gender })"
    >
      <div class="EditGender">
        <button
          :class="genderEdit.gender == 1 ? 'boy activeBoy' : 'boy'"
          @click="handleEditBoy"
        >
          男
        </button>
        <button
          :class="genderEdit.gender == 0 ? 'girl activeGirl' : 'girl'"
          @click="handleEditGirl"
        >
          女
        </button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar";
import Listbar from "@/components/Listbar";

export default {
  // 进入页面获取数据
  mounted() {
    // 拉去本地存储数据对象格式存储到(loginData)
    const loginData = JSON.parse(localStorage.getItem("userInfo"));

    // 获取用户的(token)密令
    const { token: Authorization } = loginData;
    this.Authorization = Authorization;

    // 获取用户登录时输入的密码
    const { password } = loginData.user;
    this.passwaodEdit.password = password;

    // 获取用户的(id)传递到动态参数里面
    this.$axios({
      url: "/user/" + loginData.user.id,
      headers: { Authorization },
    }).then((response) => {
      this.userData = response.data.data;
      console.log("userData", this.userData);
    });
  },

  // 数据
  data() {
    return {
      radio: 1,
      Authorization: "",
      userData: {},
      nicknameEdit: { nickname: "", show: false },
      passwaodEdit: {
        password: "",
        oldPwd: "",
        newPwd: "",
        againPwd: "",
        show: false,
      },
      genderEdit: { gender: -1, show: false },
      fileList: [],
      popupShow: false,
    };
  },

  // 方法
  methods: {
    // 上传头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: { Authorization: this.Authorization },
        data: formData,
      }).then((response) => {
        console.log(response);
        const { url } = response.data.data;
        this.handleEditUserData({ head_img: url });
      });
    },

    // 修改昵称点击事件
    handleEditNickname(e) {
      console.log(e);
      // 打开模态框先清空先前输入的内容
      this.nicknameEdit.nickname = "";
      // 显示模态框
      this.nicknameEdit.show = true;
    },

    // 打开修改密码模态框
    handleEditPassword() {
      this.passwaodEdit.show = true;
      // 进入时，清空上一次输入的内容
      this.passwaodEdit.oldPwd = "";
      this.passwaodEdit.newPwd = "";
      this.passwaodEdit.againPwd = "";
    },
    // 提交修改密码进行核对处理再提交修
    handleCheckEditPassword() {
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      // 获取数据进行判断
      console.log("核对修改密码的内容");
      const { password, oldPwd, newPwd, againPwd } = this.passwaodEdit;

      // 判断三个输入框是否有空
      if (oldPwd.trim() && newPwd.trim() && againPwd.trim()) {
        // 判断输入的原密码和登录密码是否一致
        if (password == oldPwd) {
          // 判断新密码两次输入是否一致
          if (newPwd === againPwd) {
            // 调用修改请求
            this.handleEditUserData({ password: newPwd });

            this.$dialog
              .alert({
                title: "异常提醒",
                message: "登录状态已失效，请重新登录",
                theme: "round-button",
              })
              .then(() => {
                localStorage.removeItem('userInfo');
                this.$router.replace('/login');
              });
          }
          // 新密码不一致
          else {
            this.$toast.fail("新密码两次输入不一致");
          }
        }
        // 旧密码不一致，弹出失败提示
        else {
          this.$toast.fail("旧密码错误");
        }
      }
      // 如果有空没输入则弹出失败提示
      else {
        this.$toast.fail("密码不能有空");
      }
    },

    // 打开修改性别模态框
    handleEditGender() {
      this.genderEdit.gender = -1;
      this.genderEdit.show = true;
      this.genderEdit.gender = this.userData.gender;
    },
    // 想要修改男
    handleEditBoy() {
      this.genderEdit.gender = 1;
    },
    // 想要修改女
    handleEditGirl() {
      this.genderEdit.gender = 0;
    },

    // 通用编辑用户信息请求
    handleEditUserData(data) {
      this.$axios({
        url: "/user_update/" + this.userData.id,
        method: "POST",
        headers: { Authorization: this.Authorization },
        data,
      }).then((response) => {
        // 获取修改后的返回数据源
        this.userData = response.data.data;
        // 弹出修改成功提示框
        this.$toast.success({ message: "修改成功"});
      });
    },
  },
  components: {
    Titlebar,
    Listbar,
  },
};
</script>

<style scoped lang="less">
// 封面
.cover {
  position: relative;
  text-align: center;
  margin: 30 / 360 * 100vw 0;
  height: 100 / 360 * 100vw;

  .cover-size {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100 / 360 * 100vw;
    height: 100%;
  }
  .icon-cover {
    width: 100%;
    height: 100%;
    font-size: 18 / 360 * 100vw;
  }

  .uploadCover {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

// 修改性别的高亮状态
.EditGender {
  height: 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  .boy,
  .girl {
    width: 30%;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .activeBoy {
    color: #fff;
    background: skyblue;
  }

  .activeGirl {
    color: #fff;
    background: pink;
  }
}
</style>