<template>
  <div>
    <!-- 收藏揶表头 -->
    <Titlebar title="栏目管理" showBack="true" />

    <!-- 内容 -->
    <section class="section">
      <p>点击删除以下频道</p>
      <div class="list">
        <!-- 循环渲染出is_top=1的栏目数组 -->
        <span
          class="item"
          v-for="(item, index) in checkArr"
          :key="index"
          :class="['关注', '头条'].includes(item.name) ? `active` : ``"
          @click="handleDel(item, index)"
        >
          {{ item.name }}
        </span>
      </div>

      <p>点击添加以下频道</p>
      <div class="list">
        <span
          class="item"
          v-for="(item, index) in uncheckArr"
          :key="index"
          @click="handleAdd(item, index)"
        >
          {{ item.name }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
// 导入表头
import Titlebar from "@/components/Titlebar";

export default {
  data() {
    return {
      // 本地获取的栏目数组
      categories: [],
      // 显示已添加的频道
      checkArr: [],
      // 显示未添加的频道
      uncheckArr: [],
    };
  },
  // 注册组件
  components: { Titlebar },
  // 组件加载完毕后触发
  mounted() {
    // 获取本地的栏目数据
    this.categories = JSON.parse(localStorage.getItem("category"));

    // 拆分两个数组
    this.checkArr = this.categories.filter((v) => {
      return v.is_top == 1;
    });

    this.uncheckArr = this.categories.filter((v) => {
      return v.is_top == 0;
    });

    console.log(this.checkArr);
    console.log(this.uncheckArr);
  },
  methods: {
      // 点击删除栏目，也就是上面栏目的事件
      handleDel(item, index){
          // 如果是头条或者关注，就无效
          if(['关注', '头条'].includes(item.name)) return;

          // 把当前这项从checkArr中删除掉
          this.checkArr.splice(index, 1);

          // 修改当前点击栏目的is_top为0
          item.is_top = 0;
          // 保存到下面的数组中
          this.uncheckArr.push(item);

      }
  }
};
</script>

<style scoped lang="less">
.section {
  padding: 10 / 360 * 100vw;

  p {
    margin: 10 / 360 * 100vw;
    font-size: 14px;
    color: #333;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      border: 1px solid #999;
      padding: 5 / 360 * 100vw 15 / 360 * 100vw;
      font-size: 14px;
      text-align: center;
      margin: 5 / 360 * 100vw 10 / 360 * 100vw;
    }
  }
}

.active {
  border-color: #ddd;
  color: #999;
}
</style>