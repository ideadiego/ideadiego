<template>
    <div>
        <button class="btn btn-accent" @click="throwConfetti">{{title}}</button>
    </div>
</template>

<script>
  import JSConfetti from 'js-confetti'
    export default {
        props: ['title', 'emoji'],
        async mounted() {
          this.jsConfetti = new JSConfetti()
        },
        data() {
        return {
          jsConfetti: '',
        }
      },
      methods: {
        throwConfetti(){
            this.jsConfetti.addConfetti({
                emojis: [this.emoji],
                emojiSize: 80,
                confettiNumber: 40,
            }) 
        }
      }
    }
</script>
