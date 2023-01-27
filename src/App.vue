<template>
  <div class="isCaring">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
    name: 'App',
    data(){
        return{
             direction: "slide-left"
        }
    },
    created() {
      // document.querySelector(':root').setAttribute('style', '--caring-font: 0px');
      localStorage.getItem('isBigFont') === 'true' ? document.querySelector(':root').setAttribute('style', '--caring-font: 4px')
      : document.querySelector(':root').setAttribute('style', '--caring-font: 0px');
    }
}
</script>

<style>
:root {
  --caring-font: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin:0;
  padding:0;
}
</style>
