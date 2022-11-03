import {
	Control,
	Controller,
	FieldValues,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";

type Props = {
	name: string;
	label: string;
	values: { label: string; value: boolean | string | number }[];
	control: Control<FieldValues>;
};

export function RadioGroupInput({ name, values, label, control }: Props) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: currentValue, ref } }) => (
				<div className="flex flex-col gap-2">
					<span>{label}</span>
					{values.map(({ label, value }) => {
						const id = `${name}-${label}-${value}`;
						return (
							<div key={id} className="flex gap-2">
								<input
									id={id}
									type="radio"
									className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
									ref={ref}
									checked={currentValue === value}
									onChange={() => onChange(value)}
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
			)}
		/>
	);
}
