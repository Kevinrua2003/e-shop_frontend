import {CategoryInputProps} from "@/UI/inputs/types/types";

const CategoryInput: React.FC<CategoryInputProps> = ( {
                                                        selected,
                                                        label,
                                                        icon: Icon,
                                                        onClick,
                                                      } ) => {
    return (
        <div onClick={() => onClick(label)} className={
            `rounded-xl border-2 p-4 m-1 flex flex-col items-center justify-center gap-2 hover:border-slate-500 transition cursor-pointer ${selected ? "border-slate-500" : "border-slate-200"}`}>
            <Icon size={30}/>
            <div className={"font-medium"}>{label}</div>
        </div>
    );
};

export default CategoryInput;