import type { PostProps } from "../../components/app/Post";

export const IMAGE_TO_CHAT_MAP = {
  link: "https://assetsio.gnwcdn.com/tears-of-the-kingdom-selfie-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
  zelda:
    "https://static.wikia.nocookie.net/zelda/images/5/5f/Zelda_Artwork_%28Breath_of_the_Wild%29.png",
  ganondorf:
    "https://assetsio.gnwcdn.com/Zelda_Tears_of_the_Kingdom_Reach_Ganondorf_Header.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
  beedle:
    "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/05/beedle_botw.jpg",
  sidon:
    "https://cdn.vox-cdn.com/thumbor/_YuJRI8oPh9tY7rB3ng_dHm8PGs=/39x99:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/72272899/sidon_zelda_tears_kingdom.0.jpg",
  revali: "https://images.nintendolife.com/0b3c312b0f9c7/revali.large.jpg",
  daruk:
    "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/3d/BotW_Daruk_Model.png/",
  urbosa: "https://images.nintendolife.com/31c20c3bf4aeb/urbosa-1.large.jpg",
  mipha:
    "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/04/19/Mipha-tears-of-the-kingdom-voice-actors-1024x576.jpg",
  impa: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/5/58/Impa_%281%29.jpg",
};

export const LINK_PROFILE_POSTS: Array<PostProps> = [
  {
    postId: 1,
    username: "link",
    name: "Link",
    avatar: IMAGE_TO_CHAT_MAP.link,
    age: "2m",
    content:
      "Just found another Korok seed! These little guys are everywhere! 🌱 #HyruleAdventures #KorokHunt",
    likes: 10,
    comments: 1,
    saves: 0,
  },
  {
    postId: 2,
    username: "link",
    name: "Link",
    avatar: IMAGE_TO_CHAT_MAP["link"],
    age: "1h",
    content:
      "Cooking up some mighty meals today. Anyone got a good recipe for Dubious Food? 🍲 #CookingWithLink",
    likes: 20,
    comments: 2,
    saves: 1,
  },
  {
    postId: 3,
    username: "link",
    name: "Link",
    avatar: IMAGE_TO_CHAT_MAP["link"],
    age: "5h",
    content:
      "Stumbled upon an ancient shrine. The puzzles in these never get old! 🧩 #ShrineSeeker #ZeldaPuzzleMaster",
    likes: 2,
    comments: 0,
    saves: 0,
  },
  {
    postId: 4,
    username: "link",
    name: "Link",
    avatar: IMAGE_TO_CHAT_MAP["link"],
    age: "2d",
    content:
      "Finally upgraded my armor! Feeling invincible now. 💪 #ArmorUpgrade #HyruleWarrior",
    likes: 23,
    comments: 4,
    saves: 0,
  },
  {
    postId: 5,
    username: "link",
    name: "Link",
    avatar: IMAGE_TO_CHAT_MAP["link"],
    age: "07/22/2024",
    content:
      "Defeated Ganon again. When will he learn? #HeroOfHyrule #NeverGiveUp",
    likes: 100,
    comments: 34,
    saves: 10,
  },
];
