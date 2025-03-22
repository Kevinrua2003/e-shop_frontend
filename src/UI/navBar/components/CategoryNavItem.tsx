import {CategoryNavItemProps} from "@/UI/admin/types/types";

const CategoryNavItem: React.FC<CategoryNavItemProps> = ({
    selected,
    icon:Icon,
    label,                                             }) => {

    

    return (
        <div className={
            `flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-blue-600 transition cursor-pointer ${selected ? "border-b-slate-800 text-blue-800" : "border-transparent text-blue-300"}`
        }>
            <Icon className="text-white" size={20}/>
            <div className={'font-medium text-sm text-center text-white break-normal'}>{label}</div>
        </div>
    );
};

export default CategoryNavItem;