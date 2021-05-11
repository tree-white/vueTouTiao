<template>
  <div class="container">
    <!-- 头部 -->
    <Titlebar title="精彩跟帖" showBack="true" />

    <!-- loading：是否加载中 -->
    <!-- finished：数据是否加载完成 -->
    <!-- @load：触发加载事件 -->
    <!-- immediate-check：是否初始化立即触发 -->
    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 跟帖评论列表 -->
      <div class="comment" v-for="(item, index) in list" :key="index">
        <!-- 用户信息 / 回复 -->
        <div class="comment-top">
          <!-- 左边：头像/昵称/跟帖时间 -->
          <div class="user">
            <!-- 左边头像 -->
            <img :src="$axios.defaults.baseURL + item.user.head_img" />

            <!-- 右边昵称/时间 -->
            <div class="user-info">
              <p>{{ item.user.nickname }}</p>
              <!-- moment().fromNow() 显示距离到当前的时间 -->
              <span>{{ moment(item.create_date).fromNow() }}</span>
            </div>
          </div>

          <!-- 右边：回复按钮 -->
          <span class="reply" @click="handleReply(item)">回复</span>
        </div>

        <!-- 回复列表 - 递归盒子 -->
        <div class="reply-list">
          <!-- item.parent有多少层数据，CommentFloor就自调用多少次 -->
          <CommentFloor
            v-if="item.parent"
            :data="item.parent"
            @reply="handleReply"
          />
        </div>

        <!-- 回复内容 -->
        <div class="content">{{ item.content }}</div>
      </div>
    </van-list>

    <!-- 底部发布/回复信息栏 -->

    <div class="publish">
      <!-- 输入框，点击和每点击时候显示的效果不一样的 -->
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFocus"
        type="textarea"
        :placeholder="
          reply.user ? '回复：@ ' + reply.user.nickname : '说点什么...'
        "
        class="textarea"
        :class="isFocus ? 'active' : ''"
        id="textarea"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleKeyupSubmit"
        ref="textarea"
      />

      <!-- 右边编辑按钮，当选中输入框则隐藏 -->
      <label for="textarea">
        <div class="iconfont icon-17" v-show="!isFocus"></div>
      </label>

      <!-- 发送按钮，当选中输入框的时候显示 -->
      <span class="send" v-show="isFocus" @click="handleSubmit">发布</span>
    </div>
  </div>
</template>

<script>
// 头部导航组件
import Titlebar from "@/components/Titlebar";
// 回复评论的楼层组件
import CommentFloor from "@/components/CommentFloor";
// moment时间处理组件
import moment from "moment";
// 转换过继语言，zh-CN 就是中文
moment.locale("zh-CN");

export default {
  components: { Titlebar, CommentFloor },
  data() {
    return {
      // 发布评论的数据
      message: "",
      // 输入框显示的行数
      rows: 1,
      //List分页组件
      loading: false,
      finished: false,
      // 激活时间组件
      moment,
      // 文章id
      pid: "",
      // 评论的列表
      list: [],
      // 请求的页数
      pageIndex: 1,
      // 请求的条数
      pageSize: 5,
      // 记录当前的输入框是否获得焦点
      isFocus: false,
      // 记录回复的id
      reply: {},
    };
  },
  mounted() {
    // 文章的id
    const { id } = this.$route.params;
    // 把id保存到data
    this.pid = id;

    // 请求评论列表数据
    this.getList();
  },
  methods: {
    // 请求评论列表数据
    getList() {
      this.$axios({
        url: `/post_comment/${this.pid}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        // data是评论的列表数组
        const { data } = res.data;
        // 保存到data的list数组中
        this.list = [...this.list, ...data];
        // 请求完毕后，页数需要+1
        this.pageIndex++;
        // 初始化分页相关的值
        this.loading = false;
        // 数据请求完毕
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },

    // 触发加载事件
    onLoad() {
      this.getList();
    },

    // 键盘按下回车
    handleKeyupSubmit() {
      this.handleSubmit();
      this.$refs.textarea.blur();
    },

    // 点击"发布评论"按钮触发
    handleSubmit() {
      // 发送前先判断内容是否为空
      const content = this.message.trim();
      if (!content) {
        this.$toast.fail("发布内容不能为空！");
        return;
      }

      // 获取用户的授权信息
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

      // data是动态，用于判断回复的外层还是内层还是评论
      const data = { content };

      // 如果回复的对象有id，则说明是回复的id，parent_id就是要回复的id
      if (this.reply.id) data.parent_id = this.reply.id;

      // 发布评论请求
      this.$axios({
        url: "/post_comment/" + this.pid,
        method: "POST",
        headers: { Authorization: token },
        data,
      }).then((res) => {
        // 发布成功后的信息
        this.$toast.success(res.data.message);
        // 清空输入框的内容
        this.message = "";

        // 手动更新数据
        this.list = []; // 必须要清空，如果不清空会合并之前的评论数据
        this.pageIndex = 1; // 把请求页数设置成第一页
        this.getList(); // 获取列表数据

        // 清空reply
        this.reply = {};
      });
    },

    // 输入框获得焦点触发
    handleFocus() {
      this.isFocus = true;
    },

    // 输入框数去焦点触发
    handleBlur() {
      // 失去焦点需要有一个延时，异步处理，否则无法触发发送的点击事件。
      setTimeout(() => {
        this.isFocus = false;

        // 判断失去焦点的时候输入框是否有内容，没有则清空reply
        if (!this.message.trim()) this.reply = {};
      }, 30);
    },

    // 点击回复那妞触发的事件
    handleReply(item) {
      console.log(item);
      // 因为点击时失去焦点，已经触发了handleBlur事件
      setTimeout(() => {
        // 记录下来当前回复的评论信息
        this.reply = item;
        // 打开输入框
        this.isFocus = true;

        this.$refs.textarea.focus();
      }, 30);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding-bottom: 60 / 360 * 100vw;
}

.comment {
  padding: 20 / 360 * 100vw;
  border-bottom: 1px solid #ddd;

  .comment-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20 / 360 * 100vw;

    .user {
      display: flex;
      align-items: center;

      img {
        width: 35 / 360 * 100vw;
        height: 35 / 360 * 100vw;
        margin-right: 5 / 360 * 100vw;
        border-radius: 5 / 360 * 100vw;
      }

      .user-info {
        font-size: 14 / 360 * 100vw;

        span {
          font-size: 12 / 360 * 100vw;
          color: #999;
        }
      }
    }

    .reply {
      font-size: 12 / 360 * 100vw;
      color: #999;
    }
  }

  .content {
    font-size: 14 / 360 * 100vw;
    margin-top: 10 / 360 * 100vw;
  }
}

.publish {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 5 / 360 * 100vw 20 / 360 * 100vw;
  background: #fff;

  .icon-17 {
    font-size: 30 / 360 * 100vw;
    margin-left: 5 / 360 * 100vw;
  }

  .textarea {
    background: #eee;
    border-radius: 5 / 360 * 100vw;
    padding: 5 / 360 * 100vw 10 / 360 * 100vw;
  }

  .active {
    height: 81px !important;
  }

  .send {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5 / 360 * 100vw;
    background: rgb(51, 135, 245);
    color: #fff;
    width: 50 / 360 * 100vw;
    height: 80px;
    border-radius: 5 / 360 * 100vw;
    text-align: center;
    font-size: 14 / 360 * 100vw;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.3),
      inset 0 0 8px 3px rgba(255, 255, 255, 0.3);
  }
}
</style>