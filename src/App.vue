<template>
  <div id="app">
    <Menu />
    <div class="main">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import greetings from '@/utils/greetings'

export default {
  name: 'App',
  components: {
    Menu
  },
  created () {
    greetings()
  }
}
</script>

<style lang="scss">
  @import './styles/commons.scss';
</style>
