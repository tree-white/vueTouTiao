<template>
  <div class="updatePage">
    <!-- 头部标题 -->
    <Titlebar title="编辑资料" />

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

    <!-- 修改信息 -->
    <Listbar
      v-for="(item, index) in rows"
      :key="index"
      :label="item.label"
      :tips="item.tips"
    />
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar";
import Listbar from "@/components/Listbar";

export default {
  data() {
    return {
      fileList: [],
      popupShow: false,
      rows: [
        { label: "昵称", tips: "火星网友" },
        { label: "密码", tips: "******" },
        { label: "性别", tips: "男" },
      ],
    };
  },
  methods: {},
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