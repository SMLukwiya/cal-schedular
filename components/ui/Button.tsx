export type ButtonProps = {
    title: string;
    onClick?: () => void;
};

const Button = (props: ButtonProps) => {
    const { title, onClick } = props;

    return (
        <div>
            <button className="p-2 text-white bg-blue-800 border-0 rounded-md" onClick={onClick}>
                {title}
            </button>
        </div>
    );
};

export default Button;
