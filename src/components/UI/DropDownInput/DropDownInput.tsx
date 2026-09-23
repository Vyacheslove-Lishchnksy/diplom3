import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import styles from "./DropDownInput.module.scss";

export interface DropDownInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "list"> {
    list: string[];
    value?: string;
    onDelete?: (option: string) => void;
}

export const DropDownInput = ({
    list,
    value,
    onDelete,
    placeholder = "Select an option",
    className = "",
    ...inputProps
}: DropDownInputProps) => {
    const [selectedValue, setSelectedValue] = useState(value ?? list[0] ?? "");

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    const selectOption = (option: string) => {
        setSelectedValue(option);
    };

    return (
        <div className={`relative p-0 px-2 border border-green-100 rounded ${styles.wrapper} ${className} `}>
            <input
                className={`w-full m-0 border-none bg-transparent ${styles.input}`}
                value={selectedValue}
                placeholder={placeholder}
                aria-haspopup="listbox"
                aria-label={inputProps["aria-label"] ?? placeholder}
                {...inputProps}
            />
            {list.length > 0 && (
                <ul className={` ${styles.list} bg-gray-900 m-0 border border-green-100`} role="listbox">
                    {list.map((option, index) => (
                        <li key={option} role="option" aria-selected={option === selectedValue}>
                            <div className={`${styles.option}`}>
                                <button
                                    type="button"
                                    className={styles.optionLabel}
                                    onClick={() => selectOption(option)}
                                >
                                    {option}
                                </button>
                                {onDelete && (
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        aria-label={`Delete ${option}`}
                                        onClick={() => onDelete(option)}
                                    >
                                        <BsFillTrash3Fill aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
