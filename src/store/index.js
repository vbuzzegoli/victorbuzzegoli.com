import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/store/mutation-types'
import api from '@/api'
import about from '@/store/modules/about'
import { MAX_POSTS_PER_REQUEST } from '@/constants'

Vue.use(Vuex)

const defaultState = () => ({
  feed: [],
  allPostsFetched: false,
  serviceLayerError: null
})

const state = defaultState()

const getters = {}

const actions = {
  /**
   * Refresh the current feed to be displayed.
   * Throttled if already fetched (unless forced)
   * @param {object} payload
   * @param {boolean} payload.force
   * @param {boolean} payload.loadMorePosts load next batch of posts
   */
  async refreshFeed ({ commit, state }, { force = false, loadMorePosts = false } = {}) {
    if (force || loadMorePosts || !state.feed || !Array.isArray(state.feed) || !state.feed.length) {
      commit(types.SET_SERVICE_LAYER_ERROR, null)
      try {
        const feed = await api.fetchPosts(
          loadMorePosts && state.feed && state.feed.length
            ? state.feed.pop().timestamp
            : undefined
        )
        if (loadMorePosts && Array.isArray(feed) && feed.length < MAX_POSTS_PER_REQUEST) {
          commit(types.SET_ALL_POSTS_FETCHED, true)
        }
        commit(types.SET_FEED, { feed, merge: !!loadMorePosts })
      } catch (err) {
        commit(types.SET_SERVICE_LAYER_ERROR, err)
      }
    }
  },

  /**
   * Clears the errors cached in the store
   */
  clearServiceLayerErrors ({ commit }) {
    commit(types.SET_SERVICE_LAYER_ERROR, null)
  }
}

const mutations = {
  [types.SET_FEED] (state, { feed, merge }) {
    if (Array.isArray(feed)) {
      state.feed = (merge ? [...state.feed, ...feed] : feed).sort((a, b) => b.timestamp - a.timestamp)
    }
  },

  [types.SET_ALL_POSTS_FETCHED] (state, payload) {
    state.allPostsFetched = payload
  },

  [types.SET_SERVICE_LAYER_ERROR] (state, payload) {
    state.serviceLayerError = payload
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    about
  }
})
