import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
	name: string;
	label: string;
	values: { label: string; value: string | number }[];
	register: UseFormRegister<FieldValues>;
	options?: RegisterOptions<any, string>;
};

export function RadioGroupInput({ name, values, label, register, options }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<span>{label}</span>
			{values.map(({ label, value }) => {
				const id = `${name}-${label}-${value}`;
				return (
					<div key={id} className="flex gap-2">
						<input
							id={id}
							type="radio"
							value={value}
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							{...register(name, options)}
						/>
						<label
							htmlFor={id}
							className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							{label}
						</label>
					</div>
				);
			})}
		</div>
	);
}
