import SkeletonOverlay from "@/app/components/SkeletonOverlay";

const LoadingCirclePerson = () => {
    return (<SkeletonOverlay>
        <div className=" rounded-full h-10 w-10 bg-slate-300">

        </div>
    </SkeletonOverlay>);
}

export default LoadingCirclePerson;