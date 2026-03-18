import { JSX } from "react";

interface ISelectUIProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  list: string[];
}

const SelectUI = ({ list, label, ...rest }: ISelectUIProps): JSX.Element => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-200 m-4">
          {label}
        </label>
      )}
      <div
        className="flex items-center mt-0  mx-1 
           bg-gray-700 rounded-lg
          text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm relative"
      >
        <select
          className=" h-full bg-transparent p-2 pl-4 pr-8 rounded-b-md  border-[1.5] border-gray-300 rounded-lg"
          style={{ backgroundColor: "#202020" }}
          {...rest}
        >
          {list.map((item) => (
            <option
              className="bg-gray-700"
              key={item}
              value={item}
              style={{ backgroundColor: "#202020" }}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectUI;
