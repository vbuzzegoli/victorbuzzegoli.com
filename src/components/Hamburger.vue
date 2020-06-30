<template>
  <div
    :class="{ 'hamburger--open': open }"
    class="hamburger">
    <div/>
    <div/>
    <div/>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .hamburger {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    &>div {
      transition: .2s ease-in-out;
      background-color: var(--foreground-color);
      width: 100%;
      height: 20%;
      border-radius: 10%;
      &:last-child {
        width: 70%;
      }
    }
    &--open {
      &>div {
        width: 50%;
        &:first-child {
          width: 70%;
        }
        &:last-child {
          width: 30%;
        }
      }
    }
  }
</style>
