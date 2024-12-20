
interface ButtonTestProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonTest: React.FC<ButtonTestProps> = ({ onClick }) => {
    return (
        <button
            className="p-1 bg-blue-500 text-neutral-100 font-bold rounded-md"
            onClick={onClick}
        >
            test submit
        </button>);
}

export default ButtonTest;