import {MenuItemProps} from "@/UI/navBar/types/types";

const MenuItem: React.FC<MenuItemProps> = ({children}) => {
    return (
        <span className="text-sm font-medium">
            {children}
        </span>
    );
};

export default MenuItem;
