import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, useFormContext, UseFormRegister } from "react-hook-form";

type Props = {
	name: string;
	label: string;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	type?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["type"];
	options?: RegisterOptions<any, string>;
};

export function TextInput({ name, type, label, placeholder, options, register }: Props) {
	options = options ?? {};
	const formContext = useFormContext();
	return (
		<div className="relative z-0 w-full max-w-2xl group">
			<label htmlFor={name}>{label}</label>
			<input
				type={type ?? "text"}
				className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				{...register(name, options)}
			/>
			<span className="text-sm text-red-500">
				{formContext.getFieldState(name).error?.message}
			</span>
		</div>
	);
}
