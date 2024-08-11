import React, { useEffect, useState } from "react";
import TriforceTap from "./TriforceTap";
import Post from "../Post";
import type { PostProps } from "../Post";

//import TriforceTap from './TriforceTap';

const link_posts: Array<PostProps> = [
  {
    postId: 1,
    username: "link",
    name: "Link",
    age: "2m",
    content:
      "Just found another Korok seed! These little guys are everywhere! 🌱 #HyruleAdventures #KorokHunt",
    likes: 0,
    comments: 0,
    saves: 0,
  },
  {
    postId: 2,
    username: "link",
    name: "Link",
    age: "1h",
    content:
      "Cooking up some mighty meals today. Anyone got a good recipe for Dubious Food? 🍲 #CookingWithLink",
    likes: 0,
    comments: 0,
    saves: 0,
  },
  {
    postId: 4,
    username: "link",
    name: "Link",
    age: "5h",
    content:
      "Stumbled upon an ancient shrine. The puzzles in these never get old! 🧩 #ShrineSeeker #ZeldaPuzzleMaster",
    likes: 0,
    comments: 0,
    saves: 0,
  },
  {
    postId: 5,
    username: "link",
    name: "Link",
    age: "2d",
    content:
      "Finally upgraded my armor! Feeling invincible now. 💪 #ArmorUpgrade #HyruleWarrior",
    likes: 0,
    comments: 0,
    saves: 0,
  },
  {
    postId: 6,
    username: "link",
    name: "Link",
    age: "07/22/2024",
    content:
      "Defeated Ganon again. When will he learn? #HeroOfHyrule #NeverGiveUp",
    likes: 0,
    comments: 0,
    saves: 0,
  },
];

const LinkProfileCoverImage =
  "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/hyrule-castle-in-the-legend-of-zelda-tears-of-the-kingdom.jpg";
const LinkProfileAvatar =
  "https://assetsio.gnwcdn.com/tears-of-the-kingdom-selfie-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp";

const Profile = () => {
  const [posts, setPosts] = useState(link_posts);
  const [triforceTapWithCoolDown, setTriforceTapWithCoolDown] = useState(false);

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       const response = await fetch('http://localhost:4322/api/posts');
  //       const data = await response.json();
  //       setPosts(data.data);
  //     };

  //     fetchPosts();
  //   }, []);

  return (
    <section id="profile">
      <ProfileHeader />

      <div className="rounded-tr-xl rounded-tl-xl px-4 pb-4 mb-4 border-b-[1px] border-b-stone-200">
        <ProfileImage />

        <button
          title={`The Triforce Tap component with a cool down period is ${!triforceTapWithCoolDown ? "not" : ""} enabled. Click to toggle the example.`}
          className="relative float-right p-1 mt-2 text-xs bg-stone-200 rounded"
          onClick={() => setTriforceTapWithCoolDown(!triforceTapWithCoolDown)}
        >
          Toggle example
        </button>

        <ProfileInfo />

        <TriforceTap showExampleWithCoolDown={triforceTapWithCoolDown} />
      </div>

      {/* Recent Posts */}
      <div className="profile__recent-posts px-4">
        <h2 className="font-bold text-xl my-3">Recent Posts</h2>
        {posts.map((post) => (
          <Post key={post.postId} {...post} />
        ))}
      </div>
    </section>
  );
};

/** PROFILE COMPONENTS **/
const ProfileHeader = () => {
  return (
    <img
      src={LinkProfileCoverImage}
      alt="Cover Image"
      className="w-full h-40 rounded-tr-xl rounded-tl-xl sticky -z-10 object-cover"
    />
  );
};

const ProfileImage = () => {
  return (
    <div className="relative">
      <img
        src={LinkProfileAvatar}
        alt="Profile image of Link from the Legend of Zelda"
        className="rounded-full w-28 h-28 border-4 border-white -mt-16  absolute object-cover"
      />
    </div>
  );
};

const ProfileInfo = () => {
  return (
    <div className="pt-14">
      <h1 className="mb-2 font-bold text-2xl inline">
        Link<span></span>
      </h1>
      <p className="mt-0 text-stone-500">@link</p>

      <p className="my-2">
        🌍 Adventuring across realms to restore peace and balance. • 🗣 Not much
        of a talker
      </p>

      <p className="mt-0 text-stone-500">
        <i className="lni lni-map-marker"></i> Hyrule
      </p>

      {/* <TriforceTap /> */}
    </div>
  );
};

export default Profile;
