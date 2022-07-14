import React from "react";

export type InputProps = {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = (props: InputProps) => {
  const { label, name, type, value, onChange } = props;
  return (
    <div className="flex flex-col my-2.5 w-full">
      <label className="text-gray-700 text-sm my-1.5 mx-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="text-black text-sm bg-white border border-solid border-gray-400 p-1.5 h-9 rounded-xl"
      />
    </div>
  );
};

export default Input;
