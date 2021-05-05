<template>
  <div>
    <!-- 头部组件 -->
    <Titlebar title="我的关注" showBack="true" />

    <!-- 要循环的结构 -->
    <div class="user-item" v-for="(item, index) in myFollows" :key="index">
      <img :src="$axios.defaults.baseURL + item.head_img" />
      <div class="user-info">
        <div>{{ item.nickname }}</div>
        <p>{{ moment(item.create_date).format("YYYY-MM-DD hh:mm:ss") }}</p>
      </div>
      <span class="cancel" @click="handleUnfollow(item.id)">取消关注</span>
    </div>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar";
import moment from "moment";

export default {
  mounted() {
    const { token: Authorization, user } = JSON.parse(
      localStorage.getItem("userInfo")
    );

    this.Authorization = Authorization;
    // 调用关注列表请求
    this.handleUpdateFollowList();
  },
  data() {
    return {
      moment,
      Authorization: "",
      myFollows: [],
    };
  },
  components: { Titlebar },
  methods: {
    // 取消关注，参数id是模版传递过来的用户id
    handleUnfollow(id) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确定要取消关注吗？",
        })
        .then(() => {
          // 根据id取消用户的关注
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: { Authorization: this.Authorization },
          }).then((response) => {
            this.$toast.success("取消关注成功");
            this.handleUpdateFollowList();
          });
        }).catch((e)=> {console.log('取消操作');})
    },

    // 封装获取用户的函数
    handleUpdateFollowList() {
      return this.$axios({
        url: "/user_follows",
        headers: { Authorization: this.Authorization },
      }).then((response) => {
        const { data } = response.data;
        this.myFollows = data;
        console.log("我的关注", this.myFollows);
      });
    },
  },
};
</script>

<style scoped lang="less">
.user-item {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  align-items: center;

  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block; // 去掉图片的底部白边
    border-radius: 50%;
    object-fit: cover; // 防止图片变形
    margin-right: 20 / 360 * 100vw;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      color: #999;
      font-size: 14px;
    }
  }

  .cancel {
    display: flex;
    align-items: center;
    background: #ccc;
    padding: 5px 20px;
    border-radius: 50px;
    font-size: 14px;
  }
}
</style>