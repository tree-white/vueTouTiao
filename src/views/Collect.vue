<template>
  <div>
    <!-- 收藏揶表头 -->
    <Titlebar title="我的收藏" showBack="true" />

    <!-- 循环的结构，少于3张图片的布局 -->
    <div v-for="(item, index) in collectData" :key="index">
      <div class="collect-oneImg" v-if="item.cover.length == 1">
        <div class="oneImg-left">
          <h4>{{ item.title }}</h4>
          <span>{{ item.user.nickname }}</span>
          <span>{{ item.comments }}跟帖</span>
        </div>
        <img :src="$axios.defaults.baseURL + item.cover[0].url" />
      </div>

      <!-- 循环的结构，大于3张图片的布局 -->
      <div class="collect-manyImg" v-else-if="item.cover.length > 1">
        <h4>{{ item.title }}</h4>
        <div class="images">
          <img
            v-for="(item, index) in item.cover"
            :key="index"
            :src="$axios.defaults.baseURL + item.url"
          />
        </div>
        <div class="manyImg-left">
          <span>{{ item.user.nickname }}</span>
          <span>{{ item.comments }}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入表头
import Titlebar from "@/components/Titlebar";

export default {
  mounted() {
    // 获取用户的(token)密令
    const { token: Authorization } = JSON.parse(
      localStorage.getItem("userInfo")
    );
    // 发起请求获取收藏列表
    this.$axios({
      url: "/user_star",
      headers: { Authorization },
    }).then((response) => {
      const { data } = response.data;
      this.collectData = data;
    });
  },

  data() {
    return {
      collectData: [],
    };
  },

  components: { Titlebar },
};
</script>

<style scoped lang="less">
.collect-oneImg {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  .oneImg-left {
    flex: 1;
  }

  img {
    display: block;
    margin-left: 10 / 360 * 100vw;
    width: 121 / 360 * 100vw;
    height: 75 / 360 * 100vw;
    object-fit: cover;
    flex-shrink: 0;
  }
}

h4 {
  margin: 10 / 360 * 100vw 0;
  font-weight: 400;
  display: -webkit-box; /*将对象转为弹性盒模型展示*/
  -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
  -webkit-line-clamp: 2; /*限制文本行数*/
  overflow: hidden; /*超出隐藏*/
}

span {
  display: inline-block;
  font-size: 12px;
  color: #aaa;
  margin-right: 10 / 360 * 100vw;
}

.collect-manyImg {
  padding: 20 / 360 * 100vw;
  border-bottom: 1px solid #eee;
  h4 {
    margin: 0;
  }

  .images {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10 / 360 * 100vw;

    img {
      flex: 1;
      width: 32%;
      object-fit: cover;
    }
  }
}
</style>