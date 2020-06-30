import firebase from '@/services/firebase'
import { MAX_POSTS_PER_REQUEST } from '@/constants'

export default {
  async fetchAbout () {
    return firebase.database()
      .collection('about')
      .doc('about')
      .get().then(doc => doc.data())
  },
  async sendEmail (mail) {
    return firebase.database()
      .collection('messages')
      .add(mail)
  },
  async fetchPost (id) {
    return firebase.database()
      .collection('posts')
      .where('timestamp', '==', Number(id))
      .get()
      .then(({ docs }) => Array.isArray(docs) && docs.length && docs.pop().data())
  },
  async fetchPosts (after) {
    let ref = firebase.database()
      .collection('posts')
      .orderBy('timestamp', 'desc')

    if (after) {
      ref = ref.startAt(after)
    }

    ref = ref.limit(MAX_POSTS_PER_REQUEST)

    return ref
      .get()
      .then(({ docs }) => docs.reduce((output, doc) => {
        output.push(doc.data())
        return output
      }, []))
  }
}
