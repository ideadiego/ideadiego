export const state = () => ({
    font: "",
    colors: {
      nuxt: "#00633B",
      tailwindcss: "#38BDF8",
      javascript: "#ECD31D",
      "javascript-text": "#000",
      vue: "#314559",
      flutter: "#024F92",
      css: "#2349D8",
      html: "#D84924",
      react: "#00D0F0",
      svelte: "#F23B00",
      ruby: "#A31201",
      "ruby on rails": "#CB4444",
      heroku: "#5D39A0",
      aws: "#F2900E",
      firebase: "#E97B0B",
      node: "#3D803E",
      python: "#346E9E",
    }
  })
  
  export const getters = {
    getFont(state) {
      return state.font
    },
    getColors(state) {
      return state.colors
    }
  }
  
  export const mutations = {
    changeFont(state, text) {
      state.font = text
    }
  }
