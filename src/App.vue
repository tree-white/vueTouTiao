<template>
  <div id="app">
    <!-- 这个是匹配到组件的坑(不能删除) -->
    <router-view />
  </div>
</template>

<style lang="less">
// css 原生的写法 - 导入线上阿里字体图库
@import url(//at.alicdn.com/t/font_2524757_iqig6ka0fnj.css);
// 引入 vant 样式 - 让所有页面都可以用这个 ui 组件
@import url('../node_modules/vant/lib/index.css');

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

ul, li, ol {
  list-style: none;
}

i, em {
  font-style: normal;
}

input {
  outline: none;
}
</style>
