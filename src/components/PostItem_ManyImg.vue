<template>
  <div>
    <!-- 循环的结构，2-3张图片的布局 -->
    <div class="collect-manyImg">
      <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
      <div class="images">
        <img
          src="https://img-nos.yiyouliao.com/inforec-20210506-938f3a1bcfca0ddc27a914887ed80fa7.jpg?time=1620314216&signature=272A79830C73D83E8DFE93F5CE1A5C18"
        />
        <img
          src="https://img-nos.yiyouliao.com/inforec-20210506-938f3a1bcfca0ddc27a914887ed80fa7.jpg?time=1620314216&signature=272A79830C73D83E8DFE93F5CE1A5C18"
        />
        <img
          src="https://img-nos.yiyouliao.com/inforec-20210506-938f3a1bcfca0ddc27a914887ed80fa7.jpg?time=1620314216&signature=272A79830C73D83E8DFE93F5CE1A5C18"
        />
      </div>
      <div class="manyImg-left">
        <span>火星时报</span>
        <span>52跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.collect-manyImg {
  padding: 10 / 360 * 100vw;
  border-bottom: 1px solid #eee;
  h4 {
    margin-bottom: 10 / 360 * 100vw;
    font-weight: 400;
    display: -webkit-box; /*将对象转为弹性盒模型展示*/
    -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
    -webkit-line-clamp: 2; /*限制文本行数*/
    overflow: hidden; /*超出隐藏*/
  }

  .images {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10 / 360 * 100vw;

    img {
      width: 33%;
      object-fit: cover;
    }
  }

  span {
    display: inline-block;
    font-size: 12px;
    color: #aaa;
    margin-right: 10 / 360 * 100vw;
  }
}
</style>