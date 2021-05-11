<template>
  <div class="reply-item">
    <!-- 组件自己调用自己 -->
    <commentFloor v-if="data.parent" :data="data.parent" @reply="handleReply" />

    <div class="item-top">
      <div class="item-user">
        <!-- <i>1</i> -->
        <em>{{ data.user.nickname }}</em>
        <span>{{ moment(data.create_date).fromNow() }}</span>
      </div>

      <!-- 点击回复按钮的时候，触发父组件传递过来的回复函数 -->
      <span class="item-reply" @click="handleReply(data)">回复</span>
    </div>

    <div class="item-content">{{ data.content }}</div>
  </div>
</template>

<script>
// moment时间处理组件
import moment from "moment";

export default {
  // 声明当前的组件名，在当前组件里面name的值可以用于调用自己
  name: "commentFloor",
  props: ["data"],
  data() {
    return {
      moment,
    };
  },

  methods: {
    handleReply(item){
      // 触发父组件传递过来的(reply)函数
      this.$emit('reply',item);
    }
  }
};
</script>

<style scoped lang="less">
.reply-item {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5 / 360 * 100vw;
  font-size: 12 / 360 * 100vw;
  padding: 2 / 360 * 100vw;
  margin-bottom: 5 / 360 * 100vw;

  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    i {
      padding-left: 5 / 360 * 100vw;
    }

    em {
      margin-left: 5 / 360 * 100vw;
      margin-right: 10 / 360 * 100vw;
    }

    span {
      color: #999;
    }
  }

  .item-reply {
    margin-right: 5 / 360 * 100vw;
  }

  .item-content {
    padding: 5 / 360 * 100vw;
  }
}
</style>