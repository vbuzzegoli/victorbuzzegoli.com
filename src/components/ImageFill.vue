<template>
  <div
    :style="{ 'background-image': `url('${$data.link}')` }"
    class="image-fill" />
</template>

<script>
export default {
  name: 'ImageFill',
  props: {
    url: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      link: ''
    }
  },
  created () {
    this.preload()
  },
  methods: {
    preload () {
      const img = new Image()
      img.onload = () => {
        this.$data.link = img.src
      }
      img.src = this.url
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-fill {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    // background-image: url(''); // set dynamically
  }
</style>
