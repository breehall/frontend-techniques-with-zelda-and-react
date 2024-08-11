type NavButtonProps = {
  path: string;
  title: string;
  isNextPage: boolean;
};

export const NavButton = ({ path, title, isNextPage }: NavButtonProps) => {
  return (
    <button className="font-bold text-white bg-hyrule-green rounded p-2 shadow-md">
      <a href={path}>
        {isNextPage == false && " ⏪ "}
        {title}
        {isNextPage == true && " ⏩ "}
      </a>
    </button>
  );
};
