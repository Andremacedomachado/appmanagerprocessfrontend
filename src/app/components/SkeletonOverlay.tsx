
interface SkeletonOverlayProps {
    children: React.ReactNode

}

const SkeletonOverlay: React.FC<SkeletonOverlayProps> = ({ children }) => {
    return (
        <div className="
                relative 
                before:absolute before:inset-0
                before:-translate-x-full
                before:animate-[shimmer_3s_infinite]
                before:bg-gradient-to-r
                before:from-transparent before:via-slate-200/80 before:to-transparent
                isolate
                overflow-hidden
                before:border-t before:border-slate-200/10
            ">
            {children}
        </div>
    );
}

export default SkeletonOverlay;