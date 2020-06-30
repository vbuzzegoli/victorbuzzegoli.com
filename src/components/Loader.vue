<template>
  <div class="loader">
    <h1 class="loader-info txt-md--bold">Loading..</h1>

    <svg width="0" height="0">
    <filter id="gooey-plasma">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16" result="goo" />
      </filter>
    </svg>
    <div class="plasma">
      <div class="gooey-container">
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>

.loader {
  text-align: center;
}

.loader-info {
  margin-top: 1rem;
  margin-bottom: .7rem;
}

$plasma-color-primary: #24fab3;
$plasma-color-secondary: #63f1ce;

@keyframes plasma {
  0%   { transform : scale(6) translate3d( 20px,0,0); }
  50%  { transform : scale(1) translate3d(-60px,0,0); }
  100% { transform : scale(6) translate3d( 20px,0,0); }
}

.plasma {
  backface-visibility: hidden;
  z-index: 20;
  position      : relative;
  width         : 250px;
  height        : 250px;
  padding       : 0;
  border-radius : 50%;
  overflow      : hidden;
  box-shadow    : 0 -20px 20px 0px rgba(var(--foreground-color-rgb), .2) inset;

  .gooey-container {
    filter        : url(#gooey-plasma);
    position      : absolute;
    top           : 50%;
    left          : 50%;
    transform     : translate(-50%,-50%);
    width         : 300px;
    height        : 300px;
    padding       : 0;
    margin        : 0;
    box-shadow    : 0 0 0 20px $plasma-color-secondary inset;
    border-radius : 50%;
    overflow      : hidden;

    .bubble {
      display    : block;
      position   : absolute;
      top        : 50%;
      left       : 50%;
      width      : 100%;
      text-align : right;

      &:before{
        content       : "";
        display       : inline-block;
        background    : $plasma-color-secondary;
        width         : 30px;
        height        : 30px;
        border-radius : 50%;
        transform     : scale(6) translate3d(20px,0,0);
        box-shadow    : 0 0 15px 0 $plasma-color-primary inset,
                        0 0 10px 0 $plasma-color-primary inset;
      }
    }
    @for $i from 1 through 6 {
      .bubble:nth-child(#{$i}) {
        transform : translate(-50%,-50%) rotate(60deg*$i);
      }
      .bubble:nth-child(#{$i}):before {
        animation : plasma 3s+($i/2) linear .25s*$i infinite;
      }
    }
  }
}
</style>
