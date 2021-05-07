<template>
  <div>
      <OneImg />

      <ManyImg />

      <Video />
  </div>
</template>

<script>
// 引入 3个 请求列表组件
import OneImg from "@/components/PostItem_OneImg"
import ManyImg from "@/components/PostItem_ManyImg"
import Video from "@/components/PostItem_Video"


export default {
    components: { OneImg, ManyImg, Video }
}
</script>

<style>

</style>