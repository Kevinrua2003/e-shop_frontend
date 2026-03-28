import {NullDataProps} from "@/UI/messages/types/types";

const NullData: React.FC<NullDataProps> = ({title}) => {
    return (
        <div className="
            w-full 
            min-h-[200px]
            flex items-center justify-center
            text-[hsl(var(--text-secondary))]
            text-lg
        ">
            <p className="font-medium">
                {title}
            </p>
        </div>
    );
};

export default NullData;
