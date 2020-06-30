<template>
  <div class="hero-wrapper">
      <h3 class="txt-md--bold">{{ header }}</h3>
      <p class="txt-xs">{{ subheader }}</p>
      <button
        class="button-secondary txt-xs--bold"
        @click="cta">{{ action }}</button>
    </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    header: {
      type: String,
      required: true
    },
    subheader: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  methods: {
    cta () {
      this.$emit('cta')
    }
  }
}
</script>

<style scoped lang="scss">
  .hero-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    &>h3 {
      margin-top: 4rem;
      margin-bottom: .2rem;
    }
    &>p {
      margin-bottom: 3rem;
    }
  }
</style>
