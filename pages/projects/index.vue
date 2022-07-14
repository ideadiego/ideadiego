<template>
    <main>
        <h1 class="py-5 mx-auto max-w-5xl md:col-span-3 text-2xl md:text-4xl font-black tracking-wide text-primary">Projects</h1>
        <section class="px-3 mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            const projects = await $content('projects')
            .where({hidden: false})
            .without(['body'])
            .sortBy('proudness')
            .fetch()

            return {
                projects
                }
            },
        methods: {
        parsed_date(date, style){
            return new Date(date).toLocaleString('en-US', {dateStyle: style})
        },
      }
    }
</script>