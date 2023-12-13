import Link from "next/link"
import { MdOutlineOndemandVideo } from "react-icons/md";

interface Iprops {
    title: string;
    video: string;
}

export const CardVideoAula = ({title, video}: Iprops) => {
    return(
        <Link target="blank" className="flex items-center gap-1" href={video} about={`video ${video}`}>
            {title}
            <MdOutlineOndemandVideo />
        </Link>
    )
}