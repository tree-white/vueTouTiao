<template>
  <div>
    <!-- 循环的结构，1张图片的布局 -->
    <div>
      <div class="collect-oneImg">
        <div class="oneImg-left">
          <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
          <span>火星时报</span>
          <span>52跟帖</span>
        </div>
        <img
          src="https://img-nos.yiyouliao.com/inforec-20210506-938f3a1bcfca0ddc27a914887ed80fa7.jpg?time=1620314216&signature=272A79830C73D83E8DFE93F5CE1A5C18"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 该组件显示只有单张图片的！！！
export default {};
</script>

<style scoped lang="less">

.collect-oneImg {
  display: flex;
  padding: 10 / 360 * 100vw;
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
}
</style>