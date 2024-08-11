import { useState } from "react";
import TriforceTap from "./TriforceTap";
import Post from "../Post";
import { LINK_PROFILE_POSTS } from "../../../pages/api/posts";

const LinkProfileCoverImage =
  "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/hyrule-castle-in-the-legend-of-zelda-tears-of-the-kingdom.jpg";
const LinkProfileAvatar =
  "https://assetsio.gnwcdn.com/tears-of-the-kingdom-selfie-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp";

const Profile = () => {
  const [posts, setPosts] = useState(LINK_PROFILE_POSTS);
  const [triforceTapWithCoolDown, setTriforceTapWithCoolDown] = useState(false);

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
    </div>
  );
};

export default Profile;
