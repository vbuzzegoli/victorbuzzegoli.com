import * as types from '@/store/mutation-types'
import api from '@/api'

const defaultState = () => ({
  title: '',
  description: '',
  experiences: [],
  education: [],
  languages: [],
  legal: '',
  technologies: [],
  fetched: false
})

const state = defaultState()

const actions = {
  /**
   * Refresh the current feed to be displayed.
   * Throttled if already fetched (unless forced)
   * @param {object} payload
   * @param {boolean} payload.force
   */
  async refreshAbout ({ commit, state }, { force = false } = {}) {
    if (force || !state.fetched) {
      commit(types.SET_SERVICE_LAYER_ERROR, null)
      try {
        const about = await api.fetchAbout()
        commit(types.SET_ABOUT, about)
      } catch (err) {
        commit(types.SET_SERVICE_LAYER_ERROR, err)
      }
    }
  }
}

const getters = {}

const mutations = {
  [types.SET_ABOUT] (state, about) {
    state.title = about.title || ''
    state.description = about.description || ''
    state.legal = about.legal || ''
    state.experiences = Array.isArray(about.experiences) ? about.experiences.sort((a, b) => b.timestamp - a.timestamp) : []
    state.education = Array.isArray(about.education) ? about.education.sort((a, b) => b.timestamp - a.timestamp) : []
    state.languages = Array.isArray(about.languages) ? about.languages : []
    state.technologies = Array.isArray(about.technologies) ? about.technologies : []
    state.fetched = true
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
