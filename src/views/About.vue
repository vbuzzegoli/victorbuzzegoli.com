<template>
  <div class="about">
    <Hero
      v-if="!loading && serviceLayerError"
      header="Oops, we could not load this information."
      subheader="Please try again later."
      action="Home Page"
      @cta="redirectHome"
    />
    <Loader v-if="loading"/>
    <transition name="slide">
      <!-- Heading -->
      <div
        v-if="!loading && !serviceLayerError"
        class="about-wrapper">
        <div class="about-section">
          <h2 class="txt-xl--bold spacing-xxl">About</h2>
        </div>
        <div
          v-if="title"
          class="about-section">
          <h3 class="about-title txt-sm--bold spacing-xxxl">{{ title }}</h3>
        </div>
        <div
          v-if="description"
          class="about-section">
          <p class="about-description txt-sm spacing-xxl">{{ description }}</p>
        </div>

        <!-- Experience -->
        <div
          v-if="experiences && experiences.length"
          class="about-section">
          <h4 class="about-section-title txt-md--bold spacing-xxxl">Experience</h4>
          <div
            v-for="experience in experiences"
            :key="experience.timestamp"
            class="about-section-row">
            <div class="about-section-row-title-wrapper spacing-xxl">
              <h3 class="about-section-row-title txt-sm--bold">{{ experience.title }}</h3>
              <h4 class="about-section-row-location txt-xs">{{ experience.location }}</h4>
            </div>
            <h4 class="about-section-row-subtitle txt-xs spacing-lg">{{ experience.subtitle }}</h4>
            <p class="about-section-row-description txt-xs spacing-xl">{{ experience.description }}</p>
          </div>
        </div>

        <!-- Education -->
        <div
          v-if="education && education.length"
          class="about-section">
          <h4 class="about-section-title txt-md--bold spacing-xxxl">Education</h4>
          <div
            v-for="training in education"
            :key="training.timestamp"
            class="about-section-row">
            <h3 class="about-section-row-title txt-sm--bold spacing-xxl">{{ training.title }}</h3>
            <h4 class="about-section-row-subtitle txt-xs spacing-lg">{{ training.subtitle }}</h4>
            <p class="about-section-row-description txt-xs spacing-xl">{{ training.description }}</p>
          </div>
        </div>

        <!-- Languages -->
        <div
          v-if="languages && languages.length"
          class="about-section">
          <h4 class="about-section-title txt-md--bold spacing-xxxl">Languages</h4>
          <div
            v-for="language in languages"
            :key="language.language"
            class="about-section-row--language spacing-xxl">
            <div class="divider"/>
            <h3 class="about-section-row-language txt-xs--bold">{{ language.language }}</h3>
            <h5 class="about-section-row-level txt-xs">{{ language.level }}</h5>
          </div>
        </div>

        <!-- Work Authorization -->
        <h5
          v-if="legal"
          class="about-section-row-visa txt-xs spacing-xxxl">{{ legal }}</h5>

        <!-- Technologies -->
        <div
          v-if="technologies && technologies.length"
          class="about-section">
          <h4 class="about-section-title txt-md--bold spacing-xxxl">Technologies</h4>
          <div class="about-section-row--technology">
            <div
              v-for="technology in technologies"
              :key="technology"
              class="about-section-row-technology txt-xs--bold spacing-lg">
              {{ technology }}
            </div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Loader from '@/components/Loader.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'About',
  components: {
    Hero,
    Loader
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      serviceLayerError: state => state.serviceLayerError,
      title: state => state.about.title,
      description: state => state.about.description,
      experiences: state => state.about.experiences,
      education: state => state.about.education,
      languages: state => state.about.languages,
      legal: state => state.about.legal,
      technologies: state => state.about.technologies
    })
  },
  async created () {
    await this.fetchAbout()
  },
  methods: {
    ...mapActions([
      'refreshAbout'
    ]),
    async fetchAbout () {
      if (!this.loading) {
        this.loading = true
        console.info('Loading about section..')
        await this.refreshAbout()
        this.loading = false
      }
    },
    redirectHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
  .about {
    width: 100%;
    display: flex;
    flex-direction: column;
    &>*{
      &:last-child {
        margin-bottom: 4rem;
      }
    }
  }

  .about-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .about-description {
    text-align: justify;
  }

  .about-section {
    width: 100%;
  }

  .about-section-small {
    max-width: 600px;
  }

  .about-title {
    color: var(--primary-color);
  }

  .about-section-title {
    margin-bottom: 1rem;
  }

  .about-section-row {
    width: 100%;
    &--language {
      @extend .about-section-row;
      display: flex;
      align-items: center;
    }

    &--technology {
      @extend .about-section-row;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .about-section-row-title-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .about-section-row-location {
    color: var(--primary-color);
  }

  .about-section-row-description {
    text-align: justify;
  }

  .divider {
    background-color: var(--foreground-color);
    height: .2rem;
    width: .6rem;
    margin-right: .4rem;
  }

  .about-section-row-language {
    margin-right: .6rem;
  }

  .about-section-row-level {
    color: var(--primary-color);
  }

  .about-section-row-visa {
    width: 100%;
    background-color: rgba(var(--foreground-color-rgb), .05);
    color: rgba(var(--foreground-color-rgb), .5);
    border-radius: .3rem;
    padding: .3rem .5rem;
  }

  .about-section-row-technology {
    background-color: var(--primary-color-light);
    color: var(--background-color);
    padding: .2rem .5rem;
    border-radius: .2rem;
    margin-right: .3rem;
  }
</style>
