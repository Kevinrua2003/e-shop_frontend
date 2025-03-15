import { StatusProps } from "../types/types";

const Status: React.FC<StatusProps> = ({text, icon: Icon, bg, color}) => {
    return (
        <div className={`${bg} ${color} px-1 rounded flex text-center justify-center content-center items-center gap-1`}>
        {text}  <Icon size={15}/>
        </div>
    );
};

export default Status;