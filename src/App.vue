<template>
  <div id="app">

    <!-- keep-alive会缓存组件，如果不加include会缓存所有的组件 -->
    <!-- 但是include需要指定缓存哪个页面组件，取页面组件的name值 -->
    <keep-alive include="index,search">
      <!-- 这个是匹配到组件的坑(不能删除) -->
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
// css 原生的写法 - 导入线上阿里字体图库
@import url(//at.alicdn.com/t/font_2524757_82ywnb9dg69.css);
// 引入 vant 样式 - 让所有页面都可以用这个 ui 组件
@import url("../node_modules/vant/lib/index.css");

// 公共的样式
* {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
}

ul,
li,
ol {
  list-style: none;
}

i,
em {
  font-style: normal;
}

input {
  outline: none;
}
</style>
