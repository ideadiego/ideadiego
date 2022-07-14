<template>
  <main class="">
    <div v-if="project.image" class="-mt-14 inline-flex flex-col w-full">
      <picture class="relative">
        <img class="object-contain h-60v w-full" :src="`/images/${project.image}`" :alt="project.alt">
      </picture>
      <div class="h-60v w-full absolute bg-gradient-to-t via-transparent from-black">
        <div class="absolute bottom-0 w-full text-xs">
          <p class="flex justify-end px-5 py-3 text-neutral-content">{{project.alt}}</p>
        </div>
      </div>
    </div>

    <section class="max-w-4xl mx-auto px-3">

      <h1 class="text-3xl font-bold my-4">{{project.title}}</h1>
      <h4 class="">{{project.description}}</h4>

      <div class="flex flex-wrap gap-2 my-6 text-neutral-content">
          <nuxt-link :to="`/tags/${tag.split(' ')[0]}`" v-for="tag in project.tags" :key="tag.id" :style="`background-color: ${tagColors[tag.split(' ')[0]]}; color: ${tagColors[tag.split(' ')[0]+'-text']}`" class="tag bg-neutral-focus btn-xs notch px-2 py-1">
              #{{ tag.split(" ")[0] }}
          </nuxt-link>
      </div>

      <div class="h-px w-1/3 bg-accent my-6"></div>

      <div class="flex flex-wrap justify-between items-center text-sm gap-1">
          <p class=""> {{parsed_date(project.startedAt, 'long')}} </p>
          <div class=" w-9 h-px bg-base-content"></div>
            <div v-if="new Date(project.startedAt) > new Date(project.finishedAt)">
                <p>Unfinished</p>
            </div>
            <div v-else class="text-right">
                <p>{{parsed_date(project.finishedAt, "long")}}</p>
            </div>      
          </div>
      <article class="w-full mx-auto my-6">
        <nuxt-content class="prose max-w-none mx-auto bg-base-100 text-base-content prose-headings:text-base-content prose-strong:text-base-content prose-img:rounded-md" :document="project" />
      </article>
    </section>
  </main>
</template>

<script>
  export default {
    computed:{
        font(){
            return this.$store.state.font
        },
        tagColors(){
            return this.$store.state.colors
        }
    },
    async asyncData({ params, $content }) {
      const id = params.id
      const project = await $content('projects', id).fetch()
        return {
        project,
        id
        }
    },
    methods: {
        word_count(ast, count){
            const keys = Object.keys(ast);
            for (let i = 0; i < keys.length; i++) {
                const child = ast[keys[i]];
                if (keys[i] == 'value'){
                    count += parseInt(ast[keys[i]].split(" ").length)
                }
                // could be an array of nodes or just a node
                if (Array.isArray(child)) {
                    for (let j = 0; j < child.length; j++) {
                        count = this.word_count(child[j], count);
                    }
                } else if (this.isNode(child)) {
                    count = this.word_count(child, count);
                }
            }
            return count
        },
        isNode(node) {
        return typeof node === 'object';
        },
        reading_time(project, count){
            let words_per_minute = 250
            let words = this.word_count(project, count)
            return Math.floor(words/words_per_minute)
        },
        parsed_date(date, style){
            return new Date(date).toLocaleString('en-US', {dateStyle: style})
        },
      }
  }
</script>
