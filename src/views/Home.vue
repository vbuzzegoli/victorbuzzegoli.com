<template>
  <div class="home">
    <Hero
      v-if="serviceLayerError && !loading"
      header="Oops, seems like you're offline!"
      subheader="Please check your connection and try again."
      action="Refresh Feed"
      @cta="fetchFeed"
    />
    <Hero
      v-if="!serviceLayerError && !loading && emptyFeed"
      header="Looks like this feed is empty"
      subheader="Please try again later."
      action="Refresh Feed"
      @cta="fetchFeed"
    />

    <Loader v-if="loading && emptyFeed"/>

    <transition name="slide">
      <div
        v-if="!emptyFeed && !serviceLayerError"
        class="feed">
        <div
          v-for="(post, index) in feed"
          :key="post.timestamp"
          :class="{
            'post--small': [1,2,3,4,8,9].includes(index%12),
            'post--medium': [5,6,10,11].includes(index%12),
            'post--medium-left': [5,10].includes(index%12),
            'post--medium-right': [6,11].includes(index%12)
          }"
          class="post"
          @click="openPost(post.timestamp)"
          >
          <div class="post-image">
            <ImageFill :url="post.image" />
          </div>
          <div class="post-text-wrapper">
            <h1 class="post-title">{{ post.title }}</h1>
            <p v-if="index !== 0" class="post-date">{{ post.date }}</p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <button
        v-if="!emptyFeed && !serviceLayerError && !allPostsFetched"
        :disabled="loading"
        class="button-load-more button-secondary txt-xs--bold spacing-lg"
        @click="fetchFeed(true)">Load Previous Posts</button>
    </transition>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Loader from '@/components/Loader.vue'
import ImageFill from '@/components/ImageFill.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Hero,
    Loader,
    ImageFill
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      serviceLayerError: state => state.serviceLayerError,
      feed: state => state.feed,
      allPostsFetched: state => state.allPostsFetched
    }),
    emptyFeed () {
      return !!(!this.feed || !Array.isArray(this.feed) || !this.feed.length)
    }
  },
  async created () {
    await this.fetchFeed()
  },
  methods: {
    ...mapActions([
      'refreshFeed'
    ]),
    async fetchFeed (loadMorePosts = false) {
      if (loadMorePosts || (!this.loading && this.emptyFeed)) {
        this.loading = true
        console.info('Loading posts..')
        await this.refreshFeed({ loadMorePosts })
        this.loading = false
      }
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
  .home {
    &>*{
      &:last-child {
        margin-bottom: 4rem;
      }
    }
  }

  .feed {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: fit-content; // safari
  }

  .post {
    cursor: pointer;
    width: 100%;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;

    .post-image {
      border-radius: .3rem;
      overflow: hidden;
      box-shadow: var(--shadow);
      -webkit-box-shadow: var(--shadow);
      -moz-box-shadow: var(--shadow);
      transition: var(--transition-speed) ease-in-out;
      width: 100%;
      height: 25rem;
      flex: none;
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

    .post-text-wrapper {
      display: flex;
      justify-content: space-between;
      @include spacing-lg;
    }

    .post-title {
      @include txt-lg--bold;
    }

    .post-date {
      opacity: .3;
      @include spacing-lg;
      @include txt-sm;
    }

    @include onMobile {
      .post-title {
        @include txt-sm--bold;
      }

      .post-date {
        @include txt-xs;
      }
    }

    &--small {
      @include onDesktopAndTablet {
        width: 48%;

        .post-text-wrapper {
          @include spacing-md;
        }

        .post-title {
          @include txt-sm--bold;
        }

        .post-date {
          opacity: .3;
          @include spacing-md;
          @include txt-xs;
        }
      }
      @include onDesktop {
        .post-image {
          height: 12.5rem;
        }
      }

      @include onTablet {
        .post-image {
          height: 7.5rem;
        }
      }
    }

    &--medium {
      @include onDesktopAndTablet {

        .post-image {
          width: 62.5%;
          flex: none;
        }

        .post-text-wrapper {
          @include spacing-sm;
          flex-direction: column;
        }

        .post-title {
          @include txt-md--bold;
        }

        .post-date {
          opacity: .3;
          @include spacing-xs;
          @include txt-sm;
        }
      }
      @include onDesktop {
        .post-image {
          height: 15.625rem;
        }
      }

      @include onTablet {
        .post-image {
          height: 9.375rem;
        }
      }

      &-left {
        @include onDesktopAndTablet {
          flex-direction: row;

          .post-text-wrapper {
            padding-left: 1rem;
            align-items: flex-start;
            text-align: left;
          }
        }
      }

      &-right {
        @include onDesktopAndTablet {
          flex-direction: row-reverse;

          .post-text-wrapper {
            padding-right: 1rem;
            align-items: flex-end;
            text-align: right;
          }
        }
      }
    }
  }

  .button-load-more {
    width: 100%;
    min-height: fit-content; // safari
  }
</style>
