'use client';

interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}
const Heading: React.FC<HeadingProps> = ({
    title,
    center,
    subtitle: subTitle
}) => {
    return (
        <div className={center ? 'text-center gap-2' : 'text-start gap-2'} >
            <div className="text-2xl font-bold w-auto">
                {title}
            </div>
            <div className="font-light text-neutral-500 w-auto">
                {subTitle}
            </div>
        </div>
    )
}

export default Heading;