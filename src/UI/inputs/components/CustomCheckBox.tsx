import {CustomCheckBoxProps} from "@/UI/inputs/types/types";

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ( {
                                                            id,
                                                            label,
                                                            disabled,
                                                            register,

                                                        } ) => {
    return (
        <div className={"w-full flex flex-row gap-2 items-center"}>
            <input type="checkbox"
                   autoComplete={"off"}
                   id = { id }
                   disabled = { disabled }
                   { ...register(id) }
                   placeholder = { "" }
                   className={"cursor-pointer"}
            />
            <label htmlFor = { id } className={"cursor-pointer font-medium"} >{label}</label>
        </div>
    );
};

export default CustomCheckBox;