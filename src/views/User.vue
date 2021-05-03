<template>
  <div class="home">
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
      <van-popup v-model="show">
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
      <ul>
        <li>
          <i>我的关注</i>
          <span> 关注的用户 <i class="iconfont icon-youjiantou"></i> </span>
        </li>
        <li>
          <i>我的跟帖</i>
          <span> 跟帖/回复 <i class="iconfont icon-youjiantou"></i> </span>
        </li>
        <li>
          <i>我的收藏</i>
          <span> 文章/视频 <i class="iconfont icon-youjiantou"></i> </span>
        </li>
        <li>
          <i>设置</i>
          <span> <i class="iconfont icon-youjiantou"></i> </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    editCover() {
      console.log("点击了修改头像");
    },
    editClick() {
      console.log("点击了进入编辑界面");
    },
  },
};
</script>

<style lang="less" scoped>
.userinfo {
  margin-bottom: 10 / 635 * 100vw;
  border-bottom: 10px solid #ccc;
  padding: (50 / 635 * 100vw) (35 / 635 * 100vw);
  display: flex;

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
        color: skyblue;
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

.lists {
  padding: 0 (35 / 635 * 100vw);

  li {
    display: flex;
    justify-content: space-between;
    padding: 15 / 360 * 100vw 0;
    border-bottom: 1px solid #ccc;

    span {
        flex: 1;
        font-size: 14px;
        color: #aaa;
        text-align: right;
    }
  }
}
</style>