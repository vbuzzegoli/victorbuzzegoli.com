<template>
  <div class="menu">
    <div class="menu-head">
      <div
        class="menu-logo"
        @click="redirectHome">VBZ</div>
      <div
        class="menu-hamburger"
        @click="toggleMenu">
        <Hamburger :open="openMenu"/>
      </div>
    </div>

    <div
      :class="{ 'menu-body--opened': openMenu }"
      class="menu-body">
      <router-link
        v-for="link in links"
        :key="link.label"
        :to="link.path"
        class="menu-link txt-xs--bold">
        <span @click="toggleMenu(false)">
          {{ link.label }}
        </span>
      </router-link>

      <svgicon
        v-for="icon in icons"
        :key="icon.name"
        :name="icon.name"
        width="20"
        height="20"
        class="menu-icon"
        @click="redirectTo(icon.link)"
      />
    </div>
  </div>
</template>

<script>
import '@/assets/compiled-svg/twitter'
import '@/assets/compiled-svg/github'
import '@/assets/compiled-svg/linkedin'
import Hamburger from '@/components/Hamburger.vue'

export default {
  name: 'Menu',
  components: {
    Hamburger
  },
  data () {
    return {
      openMenu: false,
      links: [
        {
          path: '/',
          label: 'Feed'
        },
        {
          path: '/about',
          label: 'About'
        },
        {
          path: '/contact',
          label: 'Contact'
        }
      ],
      icons: [
        {
          link: 'https://twitter.com/victorbuzzegoli',
          name: 'twitter'
        },
        {
          link: 'https://github.com/vbuzzegoli',
          name: 'github'
        },
        {
          link: 'https://www.linkedin.com/in/victor-buzzegoli',
          name: 'linkedin'
        }
      ]
    }
  },
  methods: {
    redirectTo (link) {
      window.open(link)
    },
    redirectHome () {
      this.$router.push({ path: '/' })
    },
    toggleMenu (state) {
      this.openMenu = typeof state === 'boolean' ? state : !this.openMenu
    }
  }
}
</script>

<style scoped lang="scss">
</style>
