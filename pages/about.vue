<template>
    <main class="">
        <div class="px-4 lg:px-0 max-w-5xl mx-auto">
          <h1 class="py-5 text-2xl md:text-4xl font-black tracking-wide text-primary">About</h1>
          <p class="pb-5">
              Hi! My name is Diego, I create cool tech stuff
          </p>
        </div>
        <div class="timeline text-neutral-content">
            <div class="container left">
                <div class="content">
                    <h2 class="title">What</h2>
                    <p>
                        I like to design and develop mobile and web apps, 
                        electronic projects with arduino, 3d printing and virtual reality.
                        <br>
                        And then if the creation solves a need figure out how it can become a sustainable business.
                    </p>
                </div>
            </div>
            <div class="container right">
                <div class="content">
                    <h2 class="title">How</h2>
                    <p>
                        Following the <i>Lean thinking and methodology</i> 
                        I seek efficiency and flexibility at the moment of planning, creating 
                        and distributing my projects and products focusing on the final user 
                        and the value it provides to them.
                    </p>
                </div>
            </div>
            <div class="container left">
                <div class="content">
                    <h2 class="title">Why</h2>
                    <p>
                        Helping people and/or myself with my inventions its what motivates me.
                        <br>
                        There is a strong joy I feel when I see a project I imagined become a reality through hard work.
                    </p>
                </div>
            </div>
            <div class="container right">
                <div class="content">
                    <h2 class="title">Who</h2>
                    <p>
                      I'm a 23 years old engineering student from Chile.
                      <br>
                      I usually describe myself as proactive and enthusiast.
                      <br>
                      I've always dreamt with becoming an inventor but thought that everything was invented. I was so wrong.
                    </p>
                </div>
            </div>
            <div class="container left">
                <div class="content">
                    <h2 class="title">When</h2>
                    <p>
                      I'm posting an update on the thing I'm working on every week, usually on Sundays
                    </p>
                </div>
            </div>
            <div class="container right">
                <div class="content">
                    <h2 class="title">Where</h2>
                    <p>
                      For writing <nuxt-link to="/posts" class="text-primary-focus">this website</nuxt-link> and <a class="text-accent" href="https://medium.com/@ideadiego">Medium</a>.
                      <br>
                      For videos <a class="text-accent" href="https://www.tiktok.com/@ideadiego">TikTok</a> and <a class="text-accent" href="https://www.youtube.com/channel/UC1ZRx8pEbBddPGmPKIrfOfQ">Youtube</a>
                      <br>
                      For some code <a class="text-accent" href="https://github.com/ideadiego">Github</a>
                      <br>
                      For images and contact <a class="text-accent" href="https://instagram.com/ideadiego">Instagram</a>
                    </p>
                </div>
            </div>
            <div class="container left">
                <div class="content">
                    <h2 class="title">Else</h2>
                    <p>
                      I like sports, music, entrepreneurship, traveling and languages.
                      <ul class="list-disc gap-2 flex flex-col pl-4 pt-2">
                        <li>I like hiking 🌄, playing soccer ⚽ and basketball 🏀.</li>
                        <li>I play saxophone 🎷, guitar and bass 🎸, looking forward to learn accordion, trumpet and piano 🎹.</li>
                        <li>I've been to Silicon Valley 🌉 and <a href="https://www.ces.tech/" class="text-accent">CES</a> Las Vegas 🌇. Best experience in the world.</li>
                        <li>I lived some months in Canada and Brazil, therefore I speak native Spanish, good English and some Portuguese.</li>
                      </ul>
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style>

.title{
    @apply font-bold text-lg pb-1
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1111px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: hsl(var(--n));
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -12px;
  background-color: hsl(var(--n));
  border: 4px solid hsl(var(--pf));
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: 0;
}

/* Place the container to the right */
.right {
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid hsl(var(--n));
  border-width: 11px 0 11px 11px;
  border-color: transparent transparent transparent hsl(var(--n));
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid hsl(var(--n));
  border-width: 11px 11px 11px 0;
  border-color: transparent hsl(var(--n)) transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -12px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: hsl(var(--n));
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 28px;
  }

/* Full-width containers */
  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

/* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid hsl(var(--n));
    border-width: 11px 11px 11px 0;
    border-color: transparent hsl(var(--n)) transparent transparent;
  }

/* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 15px;
  }

/* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>