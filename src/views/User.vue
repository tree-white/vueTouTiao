<template>
  <div class="home">
    <!-- 标题 -->
    <Titlebar title="个人中心" />
    <div class="userinfo">
      <!-- 头像 -->
      <div class="cover" @click="showPopup">
        <van-image
          class="icon-cover"
          fit="cover"
          radius="50%"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>

      <!-- 模态框 显示/隐藏-->
      <van-popup v-model="popupShow">
        <van-image fit="fill" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </van-popup>

      <!-- 信息/编辑 -->
      <div class="msg" @click="editClick">
        <!-- 左侧 -->
        <div class="particulars">
          <div class="up">
            <!-- 性别提示 -->
            <span class="iconfont icon-nan"></span>
            <!-- 网名 -->
            <em>火星网友</em>
          </div>
          <div class="down">
            <span>2021-05-03</span>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="iconfont icon-youjiantou"></div>
      </div>
    </div>

    <div class="lists">
      <!-- 组件的调用，单双标签都可以 -->
      <!-- :key 不是报错，可以不加 -->
      <!-- 但是 vue 希望给循环的元素指定唯一的key，所以推荐在循环的时候加上index -->
      <Listbar
        v-for="(item, index) in rows"
        :key="index"
        :label="item.label"
        :tips="item.tips"
        to=""
      />

      <!-- 点击(设置)弹出动作面板 -->
      <Listbar label="设置" @click.native="selectShow = true" />
      <van-action-sheet
        v-model="selectShow"
        :actions="actions"
        @select="onSelect"
        action-sheet-item-text-color
      />
    </div>
  </div>
</template>

<script>
// 导入(components)里面的小组件 - 然后去components注册组件
import Listbar from "@/components/Listbar";
import Titlebar from "@/components/Titlebar";

export default {
  data() {
    return {
      popupShow: false,
      selectShow: false,
      // 组织一个列表按钮兰的数据
      actions: [{ name: "退 出 登 录", id: 1 }],
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖/回复" },
        { label: "我的收藏", tips: "文章视频" },
      ],
    };
  },
  // 注册组件
  components: {
    Listbar,
    Titlebar,
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.selectShow = false;
      if (item.id === 1) {
        this.$router.replace("/login");
      }
    },
    showPopup() {
      this.popupShow = true;
      console.log("点击头像，并弹出模态框");
    },
    editCover() {
      console.log("点击了修改头像");
    },
    editClick() {
      console.log("点击了进入编辑界面");
      this.$router.push("/user/update");
    },
  },
};
</script>

<style lang="less" scoped>
// 上部分(头像/性别/昵称/注册时间/右箭头)
.userinfo {
  margin-bottom: 10 / 635 * 100vw;
  border-bottom: 5px solid #ccc;
  padding: (50 / 635 * 100vw) (35 / 635 * 100vw);
  display: flex;

  // 封面
  .cover {
    margin-right: 10 / 360 * 100vw;

    .icon-cover {
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      font-size: 18 / 360 * 100vw;
    }
  }

  // 模态框的
  .van-popup--center {
    font-size: 0; // 去除img下边的白边
    width: 100%; // 放大头像
  }

  .van-cell {
    padding: 0;
  }

  .msg {
    flex: 1;
    height: auto;
    display: flex;
    justify-content: space-between;

    .particulars {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .icon-nan {
        margin-right: 5 / 360 * 100vw;
        color: skyblue; // 头像的样色，后期设置性别需要修改该颜色
        font-size: 18px;
      }

      .down {
        font-size: 18px;
        color: #ccc;
      }
    }

    .icon-youjiantou {
      display: flex;
      align-items: center;
      font-size: 17 / 360 * 100vw;
      color: #ccc;
    }
  }
}

// 中间部分(我的关注/跟帖/收藏/设置)
</style>