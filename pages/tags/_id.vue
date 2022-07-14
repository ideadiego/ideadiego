<template>
  <main class="mx-3">
    <h1 class="py-5 mx-auto max-w-5xl md:col-span-3 text-2xl md:text-4xl font-black tracking-wide text-primary">Projects with tag <span class="text-accent">{{tag}}</span></h1>
        <div class="mx-auto max-w-5xl" v-if="projects.length == 0">
            None 😛
        </div>
        <section v-else class="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <template v-for="project in projects" >
                <div class="notch-squared flex mx-auto flex-col bg-neutral text-neutral-content mb-4">
                    <nuxt-link :to="project.path">
                    <div class="absolute top-4 right-3 flex text-xs">
                        <div v-if="project.halted">
                            <p class="bg-error text-error-content px-2 py-1 mx-1 notch">Halted</p>
                        </div>
                        <div v-else-if="project.working_on">
                            <p class="bg-success text-success-content px-2 py-1 mx-1 notch">Working on it</p>
                        </div>
                    </div>
                    <div v-if="project.image">
                        <img :src="`/images/${project.image}`" :alt="project.alt" class="h-40 md:h-56 w-64 md:w-80 object-cover">
                    </div>
                    <div v-else>
                        <img :src="`/images/placeholder.png`" :alt="project.alt" class="h-40 md:h-56 w-64 md:w-80 object-cover">
                    </div>
                    </nuxt-link>
                    <div class="flex flex-1 flex-col p-5 justify-between w-64 md:w-80">
                        <nuxt-link :to="project.path">
                        <div class="flex items-center justify-between text-sm">
                            <p class="">{{parsed_date(project.startedAt, "long")}}</p>
                            <div class=" w-9 h-px bg-neutral-content"></div>
                            <div v-if="new Date(project.startedAt) > new Date(project.finishedAt)">
                                <p>Unfinished</p>
                            </div>
                            <div v-else class="text-right">
                                <p>{{parsed_date(project.finishedAt, "long")}}</p>
                            </div>
                        </div>
                        <h3 class="font-bold my-3 leading-snug text-xl">{{project.title}}</h3>
                        <h4 class="font-bitter text-sm font-light mb-3 leading-snug">{{project.description}}</h4>
                        </nuxt-link>
                        <div class="flex flex-wrap gap-2">
                            <nuxt-link :to="`/tags/${tag.split(' ')[0]}`" :style="`background-color: ${tagColors[tag.split(' ')[0]]}; color: ${tagColors[tag.split(' ')[0]+'-text']}`" v-for="tag in project.tags" :key="tag.id" class="tag bg-neutral-focus btn-xs notch px-2 py-1">
                                #{{ tag.split(' ')[0] }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </template>
        </section>
        <h1 class="py-5 mx-auto max-w-5xl text-2xl md:text-4xl font-black tracking-wide text-primary">Posts with tag <span class="text-accent">{{tag}}</span></h1>
        <div class="mx-auto max-w-5xl" v-if="posts.length == 0">
            None 😛
        </div>
        <section v-else class="mx-auto max-w-5xl flex flex-col gap-8">
            <template v-for="post in posts">
                <nuxt-link :to="post.path" class="md:mx-28 notch md:h-40 flex bg-neutral text-neutral-content justify-between col-start-1 col-span-12 md:col-start-6 md:col-span-7">
                    <div class="flex flex-1 flex-col py-3 px-5 justify-evenly">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <div class="hidden md:block mr-3 w-9 h-px bg-neutral-content"></div>
                                <p class="text-sm"> {{parsed_date(post.createdAt, 'full')}} </p>
                            </div>
                            <p class="text-xs ml-3">{{reading_time(post.body.children, 0)}} min read</p>
                        </div>
                        <div class="flex flex-wrap gap-2 my-2">
                            <nuxt-link :to="`/tags/${tag.split(' ')[0]}`" v-for="tag in post.tags" :key="tag.id" :style="`background-color: ${tagColors[tag.split(' ')[0]]}; color: ${tagColors[tag.split(' ')[0]+'-text']}`" class="tag bg-neutral-focus btn-xs notch px-2 py-1">
                                #{{ tag.split(" ")[0] }}
                            </nuxt-link>
                        </div>
                        <div class="text-xs line-clamp-1">
                            <h3 class="font-bold line-clamp-2 leading-snug text-lg">{{post.title}}</h3>
                        </div>
                    </div>
                    <picture v-if="post.image">
                        <img :src="`/images/${post.image}`" :alt="post.alt" class="object-cover h-full w-24 md:h-40 md:w-44 max-w-max">
                    </picture>
                </nuxt-link>
            </template>
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
            const posts = await $content('posts')
            .where({hidden: false, tags: {$containsAny: Array.from({length: 5}, (_, index) => `${params.id.toLowerCase()} ${index + 1}`)}})
            .sortBy('createdAt')
            .fetch()

            const projects = await $content('projects')
            .where({hidden: false, tags: {$containsAny: Array.from({length: 5}, (_, index) => `${params.id.toLowerCase()} ${index + 1}`)}})
            .sortBy('createdAt')
            .fetch()

            let tag = params.id

            return {
                tag,
                posts,
                projects
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
        reading_time(post, count){
            let words_per_minute = 250
            let words = this.word_count(post, count)
            return Math.floor(words/words_per_minute)
        },
        parsed_date(date, style){
            return new Date(date).toLocaleString('en-US', {dateStyle: style})
        },
      }
    }
</script>

