import Link from "next/link";

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  home?: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, onClick, home } = props;

  if (home) {
    return (
      <button className="p-2 text-blue-800 border border-blue-800 rounded-sm">
        <Link href="/">Home</Link>
      </button>
    );
  }

  return (
    <div>
      <button className="p-2 text-white bg-blue-800 border-0 rounded-md" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
