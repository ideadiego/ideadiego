---
lang: en
hidden: false
title: Hello World
description: First post 🎉🥳 and why I migrated from ruby on rails to nuxt
image: guide.jpg
alt: welcome to the internet meme
tags:
    - nuxt 1
    - javascript 1
    - tailwindcss 1
    - personal development 2
---
## Hello world 🌎✨

Hi! uhm... writing its harder than it seems.

I finally made it, I migrated my old website from ruby to vue. Now I use <a href="https://nuxtjs.org/" target="_blank">nuxt</a> with <a href="https://content.nuxtjs.org/" target="_blank">nuxt/content</a> to serve the website statically and to have pages with direct markwdown and also have the ability to insert html and vue components such as this confetti button component.

<div class="flex gap-2">
    <confetti-button title="confetti" emoji="🎉"></confetti-button>
    <confetti-button title="stars" emoji="✨"></confetti-button>
</div>

Or even mathematical equations written in LaTeX such as:

$$
\int_{-\infty}^{+\infty} e^{-x^{2}} d x
$$

The components are injected directly into the markdown.

This allows me to have full freedom on what to put in my posts and how to show it.
In ruby on rails I couldn't do that or if I wanted to it was much more code to write and gems to manage, now with nuxt I can use all the javascript libraries of the node package manager (`npm`) I can find such as that confetti one.

Another difference with ruby on rails is that now all the data is stored on the github repo of the page and served statically (and free 🤑). But I have to write plain markdown on vscode.


Since I'm only one person writing the posts I'm fine writing markdown on my IDE and then pushing the changes to my github repository, but if I had a team I will probably use some git based CMS like <a href="https://forestry.io/">forestry</a>.

I also added to the website <a href="https://tailwindcss.com/">tailwindcss</a> and <a href="https://daisyui.com/">daisyui</a> for utility classes and components for faster frontend coding.

To add css to the markdown inserted in the the posts I used <a href="https://tailwindcss.com/docs/typography-plugin">@tailwindcss/typography</a>

Daisyui also allowed me to implement themes along with the `theme-change` library, try to switch it to light by clicking the button on the upper right corner 🌞.

---

In conclusion, now its much easier to me to write and post interesting posts.

Getting more technical (and in case you want to try it yourself).

For the maths I used remark plugins along some css, <a href="https://gilberttanner.com/blog/creating-a-blog-with-nuxt-content/">here</a> is a nice guide on how to do it.

And here is the code for the confetti component.

```vue[confettiButton.vue]
<template>
    <div>
        <button class="btn btn-accent" @click="throwConfetti">{{title}}</button>
    </div>
</template>
```

```vue
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
```

And this is how they look inside the `.md` file

```vue[hello-world.md]
...
<div class="flex gap-2">
    <confetti-button title="confetti" emoji="🎉"></confetti-button>
    <confetti-button title="stars" emoji="✨"></confetti-button>
</div>

Or even mathematical equations written in LaTeX such as:

$$
\int_{-\infty}^{+\infty} e^{-x^{2}} d x
$$

...
```

Hope this site grows and get to inspire people to create stuff or just have fun seeing me making things as much as I do have doing them.
