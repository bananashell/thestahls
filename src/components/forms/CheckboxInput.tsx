import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
	name: string;
	label: string;
	register: UseFormRegister<FieldValues>;
	options?: RegisterOptions<any, string>;
};

export const CheckboxInput = ({ name, label, register, options }: Props) => {
	options = options ?? {};

	return (
		<div className="flex items-center gap-4">
			<input
				id={name}
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				{...register(name, options)}
			/>
			<label htmlFor={name} className="text-sm font-medium">
				{label}
			</label>
		</div>
	);
};
