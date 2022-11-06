import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
	name: string;
	label: string;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	type?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["type"];
	options?: RegisterOptions<any, string>;
};

export function TextInput({ name, type, label, placeholder, options }: Props) {
	options = options ?? {};

	return (
		<div className="relative z-0 w-full group">
			<label htmlFor={name}>{label}</label>
			<input
				type={type ?? "text"}
				id={name}
				className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
