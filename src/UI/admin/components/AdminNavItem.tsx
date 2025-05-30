import {AdminNavItemProps} from "@/UI/admin/types/types";

const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon:Icon,
    label,
                                                   }) => {
    return (
        <div className={
            `flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-blue-600 transition cursor-pointer ${selected ? "border-b-slate-800 text-blue-800" : "border-transparent text-blue-300"}`
        }>
            <Icon size={20}/>
            <div className={'font-medium text-sm text-center break-normal'}>{label}</div>
        </div>
    );
};

export default AdminNavItem;