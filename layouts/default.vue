<template>
  <div class="flex flex-col min-h-screen" data-theme="">
    <nav class="bg-gradient-to-b from-primary/25 via-primary/10  flex flex-wrap justify-between items-center z-50 py-2 sticky top-0 bg-transparent text-neutral-content">
      <div class="flex flex-wrap items-center justify-center sm:justify-start my-1 ml-4 sm:my-0 text-sm">
        <nuxt-link to="/" class="tooltip tooltip-bottom" data-tip="Home"><img src="/icon.png" alt="ideadiego logo" class="h-6 w-6 mr-3"/></nuxt-link>
        <nuxt-link to="/about" class="font-semibold py-0.5 my-1 mr-4 btn-secondary px-2 notch-inverted sm:my-0">About</nuxt-link>
        <nuxt-link to="/posts" class="font-semibold py-0.5 my-1 mr-3 btn-secondary px-2 notch-inverted sm:my-0">Posts</nuxt-link>
        <nuxt-link to="/projects" class="font-semibold py-0.5 my-1 mr-3 btn-secondary px-2 notch-inverted sm:my-0">Projects</nuxt-link>
      </div>
      <label class="btn btn-sm btn-circle swap swap-rotate mx-3">
        <input data-toggle-theme="cyberdiego,emerald" type="checkbox" v-model="key" @change="changeTheme()" true-value="cyberdiego" false-value="emerald" />
        <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
      </label>
    </nav>
    <Nuxt  class="flex-1" />
    <footer class="text-sm font-lato grid grid-cols-1 md:grid-cols-3 px-4 py-3 bg-neutral text-neutral-content gap-1 place-content-center mt-12">
      <nuxt-link to="/" class="col-start-1 md:col-start-1 justify-self-center md:justify-self-start self-center flex gap-1.5">
        <p>{{year}} - Some rights reserved</p>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="cc" class="w-5 h-5 inline-block self-center">
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="cc" class="w-5 h-5 inline-block self-center -ml-1">
      </nuxt-link>
      <!-- <nuxt-link class="col-start-1 md:col-start-2 justify-self-center self-center" to="/"></nuxt-link> -->
      <div class="col-start-1 md:col-start-3 justify-self-center md:justify-self-end self-center flex gap-1.5">
        <p>Made with ❤ by</p>
        <nuxt-link to="/about" class="w-5 h-5 inline-block self-center"><img src="/icon.png"  alt="ideadiego logo"></nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { themeChange } from 'theme-change'
export default {
  data() {
    return {
        year: new Date().getFullYear(),
        key: ''
    }
  },
  async mounted() {
    themeChange(false)
    await this.getTheme()
    await this.$nextTick()
    this.$store.commit('changeFont', window.getComputedStyle(document.querySelector('html')).fontFamily)
  },

  methods: {
    getTheme() {
      this.key = localStorage.getItem('theme') || 'cyberdiego'
      return this.key
    },
    async changeTheme() {
      await this.$nextTick()
      this.$store.commit('changeFont', window.getComputedStyle(document.querySelector('html')).fontFamily)
    },
  },

}
</script>
