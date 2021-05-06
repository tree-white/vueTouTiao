<template>
  <div>
    <!-- 头部 -->
    <header class="header" @touchmove.prevent>
      <!-- 左边 new -->
      <div class="iconfont icon-new"></div>
      <!-- 中间搜索框 -->
      <router-link to="#" class="search-cont">
        <div class="search">
          <span class="iconfont icon-search"></span>
          <span>搜索新闻</span>
        </div>
      </router-link>

      <!-- 右边个人中心 -->
      <router-link to="/user">
        <div class="iconfont icon-wode"></div>
      </router-link>
    </header>

    <!-- Tab栏切换 - vant 组件 -->
    <!-- v-model：就是当前的索引值，是唯一的，类似于for循环的key -->
    <!-- sticky：使用粘性布局 -->
    <section class="section">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(item, index) in navData" :title="item" :key="index">
          <div>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
            <p>内容 {{ item }}</p>
          </div>
        </van-tab>
        <van-tab title="V"></van-tab>
      </van-tabs>
    </section>

    <!-- 单张图的列表 -->
    <PostOneImg/>
    <!-- 2-3张图的列表 -->
    <PostManyImg/>
  </div>
</template>

<script>
// 文章列表的组件 - 单张图片组件
import PostOneImg from "@/components/PostItem_OneImg";
// 文章列表的组件 - 2-3张图片组件
import PostManyImg from "@/components/PostItem_ManyImg";

export default {
  data() {
    return {
      // 菜单的数据
      navData: [
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "体育",
        "汽车",
        "房产",
        "房产",
        "体育",
        "汽车",
        "房产",
      ],
      // 会记录当前的值
      active: 0,
    };
  },
  watch: {
    active() {
      console.log(this.active);
      // 如果点击的是最后一个图标，跳珠啊难道栏目管理业
      if (this.active === this.navData.length) {
        console.log("点击了”最后一个跳转“");
        this.$router.push("/栏目管理业");
      }
    },
  },
  components: { PostOneImg, PostManyImg },
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10 / 360 * 100vw;
  background: red;

  .icon-new {
    font-size: 54 / 360 * 100vw;
    color: #fff;
    margin-right: 10 / 360 * 100vw;
  }

  .search-cont {
    flex: 1;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #fff;
      background: rgba(255, 255, 255, 0.6);
      padding: 6px 0;
      border-radius: 50px;
      font-size: 14px;

      span {
        position: relative;
        z-index: 999;
      }

      .icon-search {
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }

  .icon-wode {
    font-size: 32 / 360 * 100vw;
    color: #fff;
    padding: 5px;
    margin-left: 10 / 360 * 100vw;
  }
}

/deep/ .van-tabs__wrap {
  position: relative;
  padding-right: 49px;
}

/deep/ .van-tabs__nav {
  position: unset;
  background: #eee;

  .van-tab:nth-last-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    background: #eee;
  }
}

/deep/ .van-tabs__line {
  display: none;
}

/deep/ .van-tab--active {
  border-bottom: 1px solid red;
}
</style>