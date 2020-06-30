<template>
  <div class="not-found">
    <Hero
      header="Oops, seems like this page doesn't exist"
      subheader="No worries, we'll get you back on track in no time!"
      action="Home Page"
      @cta="redirect"
    />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'NotFound',
  components: {
    Hero
  },
  methods: {
    redirect () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
  .not-found {
    &>*{
      &:last-child {
        margin-bottom: 4rem;
      }
    }
  }
</style>
