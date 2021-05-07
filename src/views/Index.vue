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
        <van-tab
          v-for="(item, index) in category"
          :title="item.name"
          :key="index"
        >
          <!-- 顶部下拉刷新 -->
          <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->

          <!-- 底部基础刷新 -->
          <van-list
            :immediate-check="false"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <PostAll :arrData="list" />
          </van-list>

          <!-- </van-pull-refresh> -->
        </van-tab>
        <!-- 最后跳转管理标签页面 -->
        <van-tab title="Ｖ"></van-tab>
      </van-tabs>
    </section>
  </div>
</template>



<script>
// 文章列表的组件
import PostAll from "@/components/PostItem_All";

export default {
  // 进来则自动获取文章列表
  mounted() {
    console.log(
      "------------------- ↓ 刷新了 Index.vue 页面 ↓ ------------------------"
    );

    const { token: Authorization } =
      JSON.parse(localStorage.getItem("userInfo")) || {};
    // console.log(Authorization ? "有密令！" : "没有密令！");

    // 调用请求列表数据
    this.getList(Authorization);

    // 请求前先判断本地是否有栏目数据
    const { data: category } =
      JSON.parse(localStorage.getItem("category")) || [];

    this.category = category;
    // console.log("列表栏数据:", this.category);

    // 有本地数据时-进行判断
    if (category) {
      // 有登录/但本地数据没关注
      if (Authorization && category[0].name !== "关注") {
        // console.log("有（本地数据）有（token）但没（关注分类）!");
        this.getCategory(Authorization);
      }

      // 没登录/但本地数据有关注
      if (!Authorization && category[0].name === "关注") {
        // console.log("有（本地数据）没（token）但有（关注分类）");
        this.getCategory();
      }

      this.handleCategories();
      //   console.log("所有栏目添加pageIndex后：", this.category);
    }
    // 没本地数据的时候则直接请求
    else {
      this.getCategory(Authorization);
      //   console.log("没有本地数据");
    }
  },

  data() {
    return {
      // 顶部下拉刷新组件的双向绑定
      refreshing: false,
      // 列表数据
      list: [],
      // 当前列表数据总条数，初始1，请求后会自动赋值
      total: 1,
      // 底部刷新组件的加载判断条件
      loading: false,
      // 底部刷新组件用来判断是否以完成所有获取
      finished: false,
      // 本地tab栏分类的数据，又初始化请求自动赋值
      category: [],
      // 本地tab栏默认请求的类别
      categoryId: 999,
      // tab栏默认选中的分类
      active: 3,
      // 每次获取数据列表的总条数
      pageSize: 5,
    };
  },
  methods: {
    // 循环给栏目加上 pageIndex，每个栏目都是自己的pageIndex
    handleCategories() {
      // 给tab栏所有分类元素对象都新增一个新的pageIndex属性并赋值=1
      this.category.forEach((v) => (v.pageIndex = 1));
    },

    // 获取菜单
    getCategory(Authorization = "") {
      // 请求栏目列表
      this.$axios({
        url: "/category",
        headers: { Authorization },
      }).then((resposne) => {
        // 打印输出获取逇菜单数据
        // console.log("获取栏目成功：", resposne.data.data);

        // 把菜单的数据保存到本地
        localStorage.setItem("category", JSON.stringify(resposne.data));

        // 渲染本地数据
        this.category = resposne.data.data;

        // 给每个栏目添加一个 pageIndex
        this.handleCategories();
      });
    },

    // 请求数据列表
    getList(Authorization = "") {
      // 请求数据列表
      this.$axios({
        url: "/post",
        params: {
          // 首次请求默认请求第一页
          pageIndex: 1,
          // 请求的类别id
          category: this.categoryId,
          // 请求的数量
          pageSize: this.pageSize,
        },
        headers: { Authorization },
      }).then((response) => {
        // 解构出请求到的数据
        const { total, data } = response.data;
        // 请求到的列表数据
        this.list = data;
        // 请求到的列表数据总条数
        this.total = total;
      });
    },

    // 底部刷新触发事件
    onLoad() {
      // 当前栏目下的pageIndex+1
      this.category[this.active].pageIndex += 1;

      // 加载下一页列表数据
      this.$axios({
        url: "/post",
        params: {
          pageIndex: this.category[this.active].pageIndex,
          pageSize: this.pageSize,
          category: this.categoryId,
        },
      }).then((response) => {
        // 解构出获取的新list数组和总条数
        const { total, data } = response.data;

        // 把新的文章数据 push 到原来的文章列表中
        this.list.push(...data);

        // 加载状态结束
        this.loading = false;

        // 判断是否最后一页
        if (this.list.length == total) {
          this.finished = true;
        }
      });
    },

    // 顶部下拉刷新组件的事件
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false;

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.onLoad();
    // },
  },

  // 监听当前点击的分类是哪一个
  watch: {
    active() {
      // 获取当前点击的栏目索引号
      console.log("点击了category中索引号为：", this.active);

      // 如果点击的是(V)则跳转到栏目管理页面
      if (this.category && this.active === this.category.length) {
        this.$router.push("/栏目管理");
        return;
      }

      // 获取当前栏目的id
      console.log("栏目的ID：", this.category[this.active].id);
    },
  },

  // 注册局部组件
  components: { PostAll },
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