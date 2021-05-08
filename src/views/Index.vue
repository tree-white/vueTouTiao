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
      <!-- tab栏 -->
      <van-tabs v-model="active" sticky swipeable @scroll="handleScroll">
        <van-tab
          v-for="(item, index) in category"
          :key="index"
          :title="item.name"
        >
          <!-- 底部基础刷新 -->
          <van-list
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <PostAll :arrData="item.list" />

            <!-- <div v-for="(subItem, subIndex) in item.list" :key="subIndex">
              <OneImg
                v-if="subItem.type == 1 && subItem.cover.length === 1"
                :data="subItem"
              />

              <ManyImg
                v-else-if="subItem.type == 1 && subItem.cover.length > 1"
                :data="subItem"
              />

              <Video v-else-if="subItem.type == 2" :data="subItem" />
            </div> -->
          </van-list>
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
import OneImg from "@/components/PostItem_OneImg";
import ManyImg from "@/components/PostItem_ManyImg";
import Video from "@/components/PostItem_Video";

export default {
  // 进来则自动获取文章列表
  mounted() {
    console.log("------------- ↓ 刷新了 Index.vue 页面 ↓ -----------------");

    // 获取本地的 token 有则获取，没有则赋值为空对象
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    // console.log(Authorization ? "有密令！" : "没有密令！");

    // 把(Authorization)保存到data里面
    this.token = token;

    // 获取本地存储的栏目数据
    const category = JSON.parse(localStorage.getItem("category"));
    // 判断本地存储是否有数据
    if (category) {
      if (
        // 如果当前是登录状态，但栏目的第一项不是"关注"，则重新请求
        (token && category[0].name !== "关注") ||
        // 如果当前是不是登录状态，但栏目的第一项是"关注"，则重新请求
        (!token && category[0].name === "关注")
      ) {
        this.getCategory();
      }
      // 如果都满足，且本地有数据，则直接赋值
      else {
        this.category = category;
        // 调用方法给每个栏目添加属性
        this.handleCategories();
      }
    } else {
      // category没数据，则直接请求，并保存到本地
      this.getCategory();
    }
  },

  data() {
    return {
      // 用户授权的token
      token: {},

      // 顶部下拉刷新组件的双向绑定
      refreshing: false,

      // 栏目数据
      category: [],

      // tab栏默认选中的分类
      active: 0,

      // loading: false,
    };
  },

  methods: {
    // 处理栏目数据
    handleCategories() {
      this.category = this.category.map((v) => {
        v.pageIndex = 1; // 给每个栏目都添加一个pageIndex属性
        v.list = []; // 给每个栏目都拥有自己的文章列表
        v.finished = false; // 每个栏目都添加一个文章是否全部加载完毕的状态
        v.loading = false; // 每个栏目都添加是否正在请求的状态
        v.scrollY = 0; // 给每个栏目添加一个滚动条的高度
        v.isload = false; // 当前栏目是否正在请求
        return v;
      });

      // 请求文章列表数据
      this.getList();
      console.log("处理栏目数据后：", this.category);
    },

    // 获取菜单
    getCategory() {
      const config = {
        url: "/category",
      };

      if (this.token) {
        config.headers = { Authorization: this.token };
      }

      // 请求栏目列表
      this.$axios(config).then((resposne) => {
        // 把栏目数据data解构
        const { data } = resposne.data;

        // 把栏目数据保存到this.category
        this.category = data;

        // 把栏目数据保存到本地存储
        localStorage.setItem("category", JSON.stringify(data));

        console.log("this.category数据：", this.category);

        // 调用方法给每个栏目添加属性
        this.handleCategories();
      });
    },

    // 获取文章列表
    getList() {
      // 当前栏目的id,pageIndex,finished
      const { id, pageIndex, finished, name, isload } = this.category[
        this.active
      ];
      // 如果当前正在加载，直接返回(节流阀作用)
      if (isload) return;
      // 开启节流阀
      this.category[this.active].isload = true;
      // 给当前的栏目页数+1
      this.category[this.active].pageIndex += 1;

      // 如果数据已经加载完毕到了最后一页，就直接return
      if (finished) return;
      // 请求文章的配置
      const config = {
        url: "/post",
        params: {
          pageIndex: pageIndex, // 没一栏的页数是不一样的
          pageSize: 5, // 请求数据的条数
          category: id,
        },
      };
      // 判断当前栏目是否是关注栏目
      if (name === "关注") {
        // 如果是，需要加上token
        config.headers = { Authorization: this.token };
      }

      this.$axios(config).then((res) => {
        const { data, total } = res.data;
        // 把data新数组和当前栏目的文章列表进行合并
        this.category[this.active].list = [
          ...this.category[this.active].list,
          ...data,
        ];

        // 用赋值的方式触发页面刷新
        this.category = [...this.category];

        // 告诉组件当前的请求加载完毕
        // this.loading = false;
        this.category[this.active].loading = false;

        // 如果当前文章的条数=total总条数，说明数据已经加载完毕
        if (this.category[this.active].list.length === total) {
          this.category[this.active].finished = true;
        }

        console.log(this.category[this.active]);

        // 关闭节流阀
        this.category[this.active].isload = false;
      });
    },

    // 底部刷新触发事件
    onLoad() {
      // 请求文章的列表
      this.getList();
    },

    // 监听tab滚动的事件，返回值是一个对象：{ scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
    handleScroll({ scrollTop }) {
      // 因为栏目不管是从本地获取或者请求接口也好，都是需要时间。
      // 所以需要this.category有值才设置滚动条
      if (this.category.length == 0) return;
      // srcollTop 是滚动条的距离
      this.category[this.active].scrollY = scrollTop;
      // 把滚动条的高度赋值给当前栏目下的scrollY
      //   console.log("已滚动的高度：", this.category[this.active].scrollY);
    },
  },

  // 注册局部组件
  components: { PostAll, OneImg, ManyImg, Video },

  // 监听当前点击的分类是哪一个
  watch: {
    active() {
      // 获取当前点击的栏目索引号
      //   console.log("点击了category中索引号为：", this.active);

      // 如果点击的是(V)则跳转到栏目管理页面
      if (this.category && this.active === this.category.length) {
        this.$router.push("/栏目管理");
        return;
      }

      // 获取当前栏目的id
      console.log("索引号：", this.active);
      console.log("栏目的ID：", this.category[this.active].id);

      // 当栏目切换时，重新请求栏目数据
      this.getList();

      // 需要等待文章数据的渲染，渲染完成之后才进行滚动
      setTimeout(() => {
        // 页面滚动到当前栏目下的scrollY值
        window.scrollTo(0, this.category[this.active].scrollY);
      }, 10);
    },
  },
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