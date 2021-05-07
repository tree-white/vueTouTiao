<template>
  <div>
    <div v-for="(item, index) in arrData" :key="index">
      <OneImg v-if="item.type == 1 && item.cover.length == 1" :data="item"/>

      <ManyImg v-else-if="item.type == 1 && item.cover.length > 1" :data="item" />

      <Video v-else-if="item.type == 2" :data="item"/>
    </div>
  </div>
</template>

<script>
// 引入 3个 请求列表组件
import OneImg from "@/components/PostItem_OneImg";
import ManyImg from "@/components/PostItem_ManyImg";
import Video from "@/components/PostItem_Video";

export default {
  mounted() {},
  props: ["arrData"],
  watch: {
    arrData() {
      console.log("PostItem_All组件要渲染的内容：",this.arrData);
      this.arrData.forEach(item => {
        item.comments = item.comment_length
      })
    },
  },
  components: { OneImg, ManyImg, Video },
};
</script>

<style>
</style>