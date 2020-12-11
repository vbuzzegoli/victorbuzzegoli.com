<template>
  <div ref="main" class="details">
    <Hero
      v-if="!loading && !post"
      header="Oops, we could not find this post."
      subheader="Please try again later."
      action="Home Page"
      @cta="redirectHome"
    />

    <Loader v-if="loading && !post"/>

    <div
      v-if="post"
      class="post">
      <div class="post-top-row">
        <div
          v-if="post.tags && Array.isArray(post.tags) && post.tags.length"
          class="post-tag-wrapper">
          <div
            v-for="tag in post.tags"
            :key="tag"
            class="post-tag txt-xs--bold">
            {{ tag }}
          </div>
        </div>
        <div v-else />
        <h6 class="post-date txt-sm">{{ post.date }}</h6>
      </div>
      <h1 class="post-title txt-xl--bold spacing-xl">{{ post.title }}</h1>
      <div class="post-image spacing-xxl">
        <ImageFill :url="post.image" />
      </div>
      <p class="post-description txt-sm spacing-xxl">{{ post.description }}</p>
      <div
        v-if="post.link">
        <button
          class="post-link button-secondary txt-sm--bold spacing-xxl"
          @click="redirectTo(post.link)">Learn More</button>
      </div>
      <div
        v-if="!emptyFeed">
        <h3 v-if="relatedPosts.length" class="txt-md--bold spacing-xxxl">Related Posts</h3>
        <div class="related-posts spacing-xxl">
          <div
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.timestamp"
            class="related-post"
            @click="openPost(relatedPost.timestamp)"
            >
            <div class="related-post-image">
              <ImageFill :url="relatedPost.image" />
            </div>
            <div class="related-post-text-wrapper">
              <h2 class="related-post-title">{{ relatedPost.title }}</h2>
              <p class="related-post-date">{{ relatedPost.date }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Loader from '@/components/Loader.vue'
import ImageFill from '@/components/ImageFill.vue'
import api from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'Post',
  components: {
    Hero,
    Loader,
    ImageFill
  },
  data () {
    return {
      post: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      feed: state => state.feed
    }),
    emptyFeed () {
      return !!(!this.feed || !Array.isArray(this.feed) || !this.feed.length)
    },
    relatedPosts () {
      if (this.emptyFeed) { return [] }
      return this.feed.reduce((output, post) => {
        if (output.length < 4 && (!this.post || post.timestamp !== this.post.timestamp)) {
          output.push(post)
        }
        return output
      }, [])
    }
  },
  async created () {
    const postId = this.$route.query.id
    if (!this.emptyFeed) {
      const post = this.feed.find(p => p.timestamp === postId)
      if (post) {
        this.post = post
        return
      }
    }

    // Attempt to fetch post if not found in cached feed
    await this.fetchPost(postId)
  },
  methods: {
    async fetchPost (id) {
      this.loading = true
      this.post = await api.fetchPost(id).catch(() => null)
      this.loading = false
    },
    redirectTo (link) {
      window.open(link)
    },
    redirectHome () {
      this.$router.push({ path: '/' })
    },
    openPost (postId) {
      console.info('Openning post: ', postId)
      this.$router.push({ path: '/post', query: { id: postId } })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/mixins.scss';

  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    &>*{
      &:last-child {
        margin-bottom: 4rem;
      }
    }
    .post {
      @extend .details;
    }
  }

  .post-top-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: fit-content; // safari
  }

  .post-tag-wrapper {
    display: flex;
    flex-direction: row;
    min-height: fit-content; // safari

    .post-tag {
      padding: .3rem .7rem;
      border-radius: .3rem;
      background-color: rgba(var(--foreground-color-rgb), .1);
      color: var(--foreground-color);
      // background-color: var(--primary-color);
      // color: var(--background-color);
      margin-right: .4rem;
      min-height: fit-content; // safari
    }

    @include onMobile {
      flex-direction: column;

      .post-tag {
        margin-bottom: .4rem;
      }
    }
  }

  .post-date {
    opacity: .6;
  }

  .post-image {
    border-radius: .3rem;
    overflow: hidden;
    box-shadow: var(--shadow);
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    width: 100%;
    height: 25rem;
    min-height: fit-content; // safari
    @include onTablet {
      height: 15rem;
    }
    @include onMobile {
      height: 10rem;
    }
  }

  .related-posts {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .related-post {
    cursor: pointer;
    width: 100%;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;

    .related-post-image {
      border-radius: .3rem;
      overflow: hidden;
      box-shadow: var(--shadow);
      -webkit-box-shadow: var(--shadow);
      -moz-box-shadow: var(--shadow);
      transition: var(--transition-speed) ease-in-out;
      width: 100%;
      height: 25rem;
      @include onTablet {
        height: 15rem;
      }
      @include onMobile {
        height: 10rem;
      }
      &:hover {
        transform: scale(1.02);
        box-shadow: var(--shadow-heavy);
        -webkit-box-shadow: var(--shadow-heavy);
        -moz-box-shadow: var(--shadow-heavy);
      }
    }

    .related-post-text-wrapper {
      display: flex;
      justify-content: space-between;
      @include spacing-lg;
    }

    .related-post-title {
      @include txt-lg--bold;
    }

    .related-post-date {
      opacity: .3;
      @include spacing-lg;
      @include txt-sm;
    }

    @include onMobile {
      .related-post-title {
        @include txt-sm--bold;
      }

      .related-post-date {
        @include txt-xs;
      }
    }

    @include onDesktopAndTablet {
      width: 48%;

      .related-post-text-wrapper {
        @include spacing-md;
      }

      .related-post-title {
        @include txt-sm--bold;
      }

      .related-post-date {
        opacity: .3;
        @include spacing-md;
        @include txt-xs;
      }
    }
    @include onDesktop {
      .related-post-image {
        height: 12.5rem;
      }
    }

    @include onTablet {
      .related-post-image {
        height: 7.5rem;
      }
    }
  }

  .dark-mode {
    .post-tag {
      background-color: rgba(var(--background-color-rgb), .1);
    }
  }

</style>
