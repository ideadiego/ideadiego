export const state = () => ({
    font: "",
    colors: {
      nuxt: "#00633B",
      tailwindcss: "#38BDF8",
      javascript: "#ECD31D",
      "javascript-text": "#000",
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
