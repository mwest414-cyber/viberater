export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "why-stars-broke-the-bar",
    title: "why stars broke the bar.",
    excerpt:
      "four stars means nothing. it could be the food, the service, the parking. it almost never means you'll actually want to be there.",
    category: "the take",
    date: "2026-04-15",
    content: `four stars means nothing.

it could be the food. the service. the portion size. the way the hostess smiled. the parking. the loyalty points. someone's anniversary that went well.

it almost never means: the light is right, the crowd is good, the music isn't too loud, and you'll actually want to stay.

we've been rating places the wrong way for twenty years. we inherited the star system from hotels and restaurants that wanted to benchmark quality. clean sheets. consistent sauce. repeatable experiences.

bars aren't that. a bar at 7pm on a monday and the same bar at 11pm on a saturday are completely different places. stars don't capture that. stars don't even try.

what you actually want to know is: what does it feel like to walk in right now?

that's the vibe. that's what we rate.

we ditched stars. we rate energy. crowd. atmosphere. the things that actually decide whether you stay for one drink or four.

because you don't want a four-star bar. you want the right bar for tonight.`,
  },
  {
    slug: "the-science-of-a-dead-room",
    title: "the science of a dead room.",
    excerpt:
      "you know it the second you walk in. something's off. it's not the drinks or the décor — it's the energy, and it's almost always the crowd.",
    category: "vibe theory",
    date: "2026-04-08",
    content: `you know it the second you walk in.

something's off. you can't place it immediately. the drinks look fine. the décor is whatever. but something is fundamentally wrong with this room, and you want to leave.

it's the energy. and it's almost always the crowd.

a dead room isn't about empty. some of the best bars on a tuesday night are half-full and completely alive. a dead room is about the people in it. they're separate. they're not talking to each other. they're on their phones. they got there early and claimed territory and now they're waiting for something that isn't going to happen.

the physics of a good room are actually simple: people facing each other, not the bar. noise that's loud enough you can't hear individual conversations. a cluster density where you might accidentally bump into someone. a reason to stay that isn't just sunk cost.

we call this crowd energy. it's one of the core things we rate because it's almost always the leading indicator. get the crowd right, the rest follows. get it wrong, and no amount of good lighting saves you.

next time you walk into a dead room, look at the geometry. you'll see exactly what's wrong before your drink arrives.`,
  },
  {
    slug: "what-a-good-tuesday-bar-looks-like",
    title: "what a good tuesday bar looks like.",
    excerpt:
      "tuesday is a filter. the people who go out on a tuesday are a specific kind of person. learn to find them and you'll have a better night than any friday.",
    category: "field notes",
    date: "2026-03-31",
    content: `tuesday is a filter.

the people who go out on a tuesday are a specific kind of person. they're not there because they have to be. they're not celebrating anything. they're not on a date that needed a reservation two weeks out. they're just people who like being out on a tuesday.

that's actually a great crowd.

the good tuesday bar looks like: eight to twelve people at the bar itself, not clustered around tables. at least one person talking to the bartender like they know them. music that's audible but not aggressive. nobody in a blazer unless they just got off work and haven't changed yet. at least one dog.

the bad tuesday bar looks like: the same four guys who've been here since five, a bachelorette party that wandered in by accident, and a DJ booth that's still setting up.

the difference between those two rooms is almost entirely about regulars. a tuesday bar that's doing well has cultivated people who want to be there on a tuesday. that takes a specific kind of bar — one that doesn't try to be everything, has a reason to exist on a slow night, and charges prices where a third drink on a tuesday isn't a moral event.

find your tuesday bar. it'll be better than most of your fridays.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
