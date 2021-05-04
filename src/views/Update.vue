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
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>

    <!-- 修改昵称 -->
    <Listbar
      label="昵称"
      :tips="nicknameEdit.nickname"
      @click.native="handleChangeNickname"
    />
    <!-- vant组件 - Dialog弹出框-->
    <van-dialog
      v-model="nicknameEdit.show"
      title="修改昵称"
      show-cancel-button
      @cancel="nicknameEdit.value = ''"
      @confirm="nicknameEdit.nickname = nicknameEdit.value"
    >
    <!-- vant组件 - field输入框 -->
      <van-cell-group>
        <van-field
          v-model="nicknameEdit.value"
          :placeholder="nicknameEdit.nickname"
        />
      </van-cell-group>
    </van-dialog>

    <!-- 修改密码 -->
    <Listbar label="密码" tips="******" />
    <!-- 修改性别 -->
    <Listbar label="性别" tips="男" />
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar";
import Listbar from "@/components/Listbar";

export default {
  data() {
    return {
      nicknameEdit: { nickname: "火星网友", show: false, value: "" },
      passwaodEdit: {},
      genderEdit: {},
      fileList: [],
      popupShow: false,
    };
  },
  methods: {
    handleChangeNickname() {
      this.nicknameEdit.value = ''
      console.log("点击了修改昵称");
      this.nicknameEdit.show = true;
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
}
</style>