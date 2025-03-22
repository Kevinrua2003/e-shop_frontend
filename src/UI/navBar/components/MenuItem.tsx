import {MenuItemProps} from "@/UI/navBar/types/types";


const MenuItem: React.FC<MenuItemProps> = ({children}) => {
    return (
        <div className={"px-4 py-3 hover:bg-neutral-100 transition"}>{children}</div>
    );
};

export default MenuItem;