<template>
    <main class="px-3">
        <h1 class="py-5 mx-auto max-w-5xl text-2xl md:text-4xl font-black tracking-wide text-primary">Posts</h1>
        <section class="mx-auto max-w-5xl flex flex-col gap-8">
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
                            <nuxt-link :to="`/tags/${tag.split(' ').slice(0,-1).join(' ')}`" v-for="tag in post.tags" :key="tag.id" :style="`background-color: ${tagColors[tag.split(' ').slice(0,-1).join(' ')]}; color: ${tagColors[tag.split(' ').slice(0,-1).join(' ')+'-text']}`" class="tag bg-neutral-focus btn-xs notch py-1">
                                #{{ tag.split(" ").slice(0,-1).join(' ') }}
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
        async asyncData({ $content }) {
            const posts = await $content('posts')
            .where({hidden: false})
            .sortBy('createdAt', 'desc')
            .fetch()

            return {
                posts
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