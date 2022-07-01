<template>
  <div class="flex flex-col min-h-screen" data-theme="">
    <nav class="flex flex-wrap justify-center sm:justify-between items-center z-50 px-4 py-3 sticky top-0 bg-primary text-primary-content">
        <nuxt-link to="/" class="font-semibold my-1 sm:my-0">ideadiego</nuxt-link>
        <div class="flex flex-wrap items-center justify-center sm:justify-start my-1 sm:my-0">
            <select
            v-model="key"
            class="select select-bordered select-sm bg-secondary text-secondary-content capitalize mx-2"
            data-choose-theme
            >
            <option v-for="(theme, index) in themes" :key="index" class="mr-5">
              {{ theme }}
            </option>
            </select>
        </div>
    </nav>
    <Nuxt  class="flex-1" />
    <footer class="grid grid-cols-1 md:grid-cols-3 px-4 py-3 bg-neutral text-neutral-content gap-1">
        <p></p>
        <nuxt-link class="col-start-1 md:col-start-2 justify-self-center" to="/">ideadiego - {{year}}</nuxt-link>
    </footer>
  </div>
</template>

<script>
import { themeChange } from 'theme-change'
export default {
  data() {
    return {
        year: new Date().getFullYear(),
        themes:  ["dark", "cupcake", "garden", "wireframe", "light"],
        key: '',
    }
  },
  async mounted() {
    themeChange(false)
    await this.getTheme()
  },

  methods: {
    getTheme() {
    this.key = localStorage.getItem('theme') || 'dark'
    return this.key
    },
  },

}
</script>