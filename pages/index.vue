<template>
  <main class="px-3">
    <section class="flex flex-col items-center justify-center mt-5 md:mt-12 md:mb-8">
        <div>
            <h2 class="text-3xl md:text-6xl font-black tracking-wide my-2 text-center md:text-left text-primary">Diego Valenzuela</h2>
            <p class="my-6 text-lg text-center text-secondary md:text-left">
                Software engineer student with design and entrepreneurial skills, currently focused in full-stack web development. <br> 
            Here I share my progress of learning and discuss concepts and ideas for digital product creation.</p>
            <p class="mt-2 text-sm text-center md:text-left">
            You can find me in 
            <span class="text-accent font-medium hover:underline">
                <a target="_blank" href="https://github.com/ideadiego">Github</a>
            </span>,
            <span class="text-accent font-medium hover:underline">
            <a target="_blank" href="https://tiktok.com/@ideadiego">TikTok</a>
            </span> and  
            <span class="text-accent font-medium hover:underline">
            <a target="_blank" href="https://www.youtube.com/channel/UC1ZRx8pEbBddPGmPKIrfOfQ">Youtube</a>
            </span> as 
            <span class="text-primary-focus font-semibold text-lg">
            <a href="/about">@ideaDiego</a></span>
            </p>
        </div>
    </section>

    <section class="grid grid-cols-1 mx-auto">
        <h2 class="text-primary font-semibold text-xl mt-6 md:mx-6">What I write about</h2>
        <cloud class="mx-auto"
        :width="innerWidth-30"
        :height="(innerHeight/3)+100"
        :data="words"
        :fontSizeMapper="fontSizeMapper"
        :font="font"
        :colors="colors"
        :rotate="() => Math.floor((Math.random() *.75) * 2) * 90"
        :padding="5"
        :onWordClick="(word) => this.$nuxt.$options.router.push(`/tags/${word.text.toLowerCase()}`)"
        />
    </section>
    <section id="recent_posts">
        <div class="flex justify-between items-center mb-6 md:mx-6 font-semibold">
            <h2 class="text-primary mt-2 text-xl">Recent posts</h2>
            <nuxt-link to="/posts" class="notch-inverted btn-secondary btn-sm px-3 pt-1">All Posts</nuxt-link>
        </div>
        <div class="max-w-5xl mx-auto grid grid-rows-none md:grid-rows-3 grid-cols-1 md:grid-cols-12 gap-4">
            <template v-for="post in posts">
                <div v-if="post == posts[0]" class="row-span-3 col-start-1 col-span-12 md:col-span-5 notch-squared inline-flex flex-col bg-neutral text-neutral-content" >
                    <nuxt-link :to="post.path">
                        <div v-if="post.image">
                            <img :src="`/images/${post.image}`" :alt="post.alt" class="object-cover h-40 md:h-56 w-full">
                        </div>
                        <div v-else>
                            <img :src="`/images/placeholder.png`" :alt="post.alt" class="object-cover h-40 md:h-56 w-full">
                        </div>
                    </nuxt-link>
                    <div class="flex flex-1 flex-col p-5 justify-between">
                            <nuxt-link :to="post.path">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-9 h-px bg-neutral-content"></div>
                                    <p class="ml-3 text-sm">{{parsed_date(post.createdAt, 'full')}}</p>
                                </div>
                                <p class="text-xs ml-3">{{reading_time(post.body.children, 0)}} min read</p>
                            </div>
                        </nuxt-link>
                        <div class="flex flex-wrap line-clamp-2 my-2">
                            <nuxt-link :to="`/tags/${tag.split(' ')[0]}`" :style="`background-color: ${tagColors[tag.split(' ')[0]]}; color: ${tagColors[tag.split(' ')[0]+'-text']}`" v-for="tag in post.tags" :key="tag.id" class="tag bg-neutral-focus btn-xs notch mr-2 px-2 py-1">
                                #{{ tag.split(" ")[0] }}
                            </nuxt-link>
                        </div>
                        <nuxt-link :to="post.path">
                            <h3 class="line-clamp-2 font-bold leading-snug text-xl">{{post.title}}</h3>
                            <p class="line-clamp-3 font-bitter text-sm font-light my-3 leading-snug">{{post.description}}</p>
                        </nuxt-link>
                    </div>
                </div>
                <nuxt-link :to="post.path" v-else class="notch h-32 md:h-40 flex bg-neutral text-neutral-content justify-between col-start-1 col-span-12 md:col-start-6 md:col-span-7">
                    <div class="flex flex-1 flex-col py-1 px-5 justify-evenly">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <div class="hidden mr-3 md:block w-9 h-px bg-neutral-content"></div>
                                <p class=" text-sm"> {{parsed_date(post.createdAt, 'full')}} </p>
                            </div>
                            <p class="text-xs ml-3">{{reading_time(post.body.children, 0)}} min read</p>
                        </div>
                        <div class="flex flex-wrap line-clamp-1">
                            <nuxt-link :to="`/tags/${tag.split(' ')[0]}`" :style="`background-color: ${tagColors[tag.split(' ')[0]]}; color: ${tagColors[tag.split(' ')[0]+'-text']}`" v-for="tag in post.tags" :key="tag.id" class="tag bg-neutral-focus btn-xs notch mr-2 px-2 py-1">
                                #{{ tag.split(" ")[0] }}
                            </nuxt-link>
                        </div>
                        <div class="text-xs line-clamp-1">
                            <h3 class="font-bold line-clamp-2 leading-snug text-lg">{{post.title}}</h3>
                        </div>
                    </div>
                    <picture v-if="post.image">
                        <img :src="`/images/${post.image}`" :alt="post.alt" class="object-cover h-32 w-24 md:h-40 md:w-44 max-w-max">
                    </picture>
                </nuxt-link>
            </template>
        </div>
    </section>

    <section id="proudest_projects">
        <div class="flex flex-wrap justify-between items-center mt-16 mb-10 md:mx-6 font-semibold">
            <h2 class="text-primary text-xl">Proudest projects</h2>
            <nuxt-link to="/projects" class="notch-inverted btn-secondary btn-sm px-3 pt-1">All Projects</nuxt-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl">
            <template v-for="project in projects" >
                <div class="notch-squared relative flex flex-col bg-neutral text-neutral-content mx-auto mb-4">
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
        </div>
    </section>
  </main>
</template>

<script>
  import Cloud from 'vue-d3-cloud';
  export default {
    components:{
        Cloud
    },
    async mounted (){
        this.words = this.get_tags(this.projectTags, this.postTags);
    },
    data() {
        return {
            words: [],
            innerWidth: (process.client) ? window.innerWidth : 300,
            innerHeight: (process.client) ? window.innerHeight : 300,
            colors: ["hsl(var(--p))","hsl(var(--s))", "hsl(var(--a))","hsl(var(--pf))","hsl(var(--sf))", "hsl(var(--af))",],
            fontSizeMapper: word => (Math.log2(word.value*1.1) * ((this.innerWidth/300) + (this.innerHeight/150))),
        }
    },
    computed:{
        font(){
            return this.$store.state.font
        },
        tagColors(){
            return this.$store.state.colors
        }
    },
    async asyncData({ $content }) {
        const postTags = await $content('posts')
            .only(['tags'])
            .fetch()

        const projectTags = await $content('projects')
            .only(['tags'])
            .fetch()

        const posts = await $content('posts')
            .where({hidden: false})
            .sortBy('createdAt', 'desc')
            .limit(4)
            .fetch()

        const projects = await $content('projects')
            .where({hidden: false})
            .without(['body'])
            .sortBy('proudness', 'desc')
            .limit(4)
            .fetch()

        return {
            projectTags,
            postTags,
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
        get_tags(postTags, projectTags){
            let tags = []
            let nw = {}
            for(let obj of postTags){
                for (let tag of obj["tags"]){
                    let t, c;
                    let splitted = tag.split(" ");
                    [t,c] = splitted
                    t = t.charAt(0).toUpperCase() + t.slice(1);
                    if(!(t in nw)){
                        nw[t] = parseInt(c)
                    }else{
                        nw[t] += parseInt(c)
                    } 
                }
            }
            for(let obj of projectTags){
                for (let tag of obj["tags"]){
                    let t, c;
                    let splitted = tag.split(" ");
                    [t,c] = splitted
                    t = t.charAt(0).toUpperCase() + t.slice(1);
                    if(!(t in nw)){
                        nw[t] = parseInt(c)
                    }else{
                        nw[t] += parseInt(c)
                    } 
                }
            }
            for (let key of Object.keys(nw)){
                tags.push({text: key, value: nw[key]})
            }
            return tags
        }
      }
    }
</script>
