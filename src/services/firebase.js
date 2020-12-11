import firebase from 'firebase/app' // Must be imported first
import 'firebase/analytics'
import 'firebase/firestore'

export default {
  initialize () {
    try {
      const configuration = require('../../../__private__/vbz.com/certs/serviceAccountKey.json') // not hosted
      firebase.initializeApp(configuration)
      firebase.analytics()
    } catch (err) {
      console.error('[FIREBASE] Could not properly initialize the database interface. Missing Credentials or Incompatible Node Version.', err)
    }
  },
  database () {
    return firebase.firestore()
  }
}
