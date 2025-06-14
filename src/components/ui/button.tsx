import { IconType } from "react-icons";
interface Props{
    title: string,
    icon: IconType,
    id: string,
    container: string
}
const Button = ({title,icon:Icon,id,container}:Props) =>{
    return(
        <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${container}`}>
            <Icon className="text-[30px]"/><span className="relative inline-flex overflow-hidden font-general text-xl"><div>{title}</div></span>
        </button>
    )
}
export default Button;