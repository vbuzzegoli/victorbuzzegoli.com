<template>
  <div class="contact">
    <div class="contact-section">
      <h2 class="txt-xl--bold spacing-xxl">Contact</h2>
      <div class="contact-information">
        <a href="mailto:victor.buzzegoli@gmail.com" class="txt-sm spacing-xxl">victor.buzzegoli@gmail.com</a><br>
        <a href="tel:+13129829060" class="txt-sm spacing-lg">+1.312.982.9060</a>
        <h3 class="txt-sm spacing-lg">New York, NY</h3>
      </div>
    </div>

    <div class="contact-section">
      <form
        class="contact-form spacing-xxl"
        @submit.stop.prevent>
        <input
          ref= "name"
          v-model="name"
          :disabled="loading || messageSent"
          placeholder="Name.."
          class="contact-form-input txt-xs"
          type="text"
          spellcheck="false"
          autocomplete="off">
        <input
          ref= "email"
          v-model="email"
          :disabled="loading || messageSent"
          placeholder="Email.."
          class="contact-form-input txt-xs"
          type="email"
          spellcheck="false">
        <input
          ref= "subject"
          v-model="subject"
          :disabled="loading || messageSent"
          placeholder="Subject.."
          class="contact-form-input txt-xs"
          type="text"
          spellcheck="false"
          autocomplete="off">
        <textarea
          ref="message"
          v-model="message"
          :disabled="loading || messageSent"
          class="contact-form-textarea txt-xs"
          spellcheck="false"
          autocomplete="off"
        />
        <button
          v-if="!messageSent"
          :disabled="incompleteForm || loading || messageSent"
          class="button-send button-secondary txt-xs--bold spacing-xxl"
          @click="sendMessage">Send Message</button>
      </form>
      <h3
        v-if="messageSent"
        class="message-sent txt-xs--bold spacing-xxl">Thanks for reaching out! I'll get back to you soon.</h3>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { sanitize } from '@/utils/sanitize'

export default {
  name: 'Contact',
  data () {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      messageSent: false,
      loading: false
    }
  },
  computed: {
    incompleteForm () {
      return !(this.name && this.email && this.subject && this.message)
    }
  },
  methods: {
    async sendMessage () {
      console.info('Sending email..')
      this.loading = true

      const mail = {
        from: sanitize(this.email),
        to: 'victor.buzzegoli@gmail.com',
        subject: sanitize(this.subject),
        message: sanitize(this.message)
      }

      try {
        await api.sendEmail(mail)
      } catch (err) {
        this.loading = false
        console.error('Could not send email.')
        return
      }

      this.messageSent = true
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/mixins.scss';

  .contact {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-evenly;
    &>*{
      &:last-child {
        margin-bottom: 4rem;
      }
    }

    @include onDesktop {
      flex-direction: row;
    }
  }

  .contact-section {
    display: flex;
    flex-direction: column;
    margin-left: .5rem;
    margin-right: .5rem;
    flex: 1 0 auto;
  }

  .contact-information {
    margin-top: 1rem;
    @include onDesktopAndTablet {
      margin-top: 5rem;
    }
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  .contact-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    @include onDesktopAndTablet {
      margin-top: 6rem;
    }
  }

  .button-send {
    width: 100%;
  }

  .message-sent {
    color: var(--primary-color);
  }
</style>
