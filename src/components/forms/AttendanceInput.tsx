import { Control, Controller, FieldValues, RefCallBack } from "react-hook-form";
import Image from "next/image";
import JA from "@public/ja.png";
import NEJ from "@public/nej.png";

type Props = {
	name: string;
	label: string;
	control: Control<FieldValues>;
};

export function AttendanceInput({ name, label, control }: Props) {
	return (
		<>
			<span className="font-semibold">{label}</span>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value: currentValue, ref } }) => (
					<div className="flex gap-8">
						<AttendanceButton
							id="attend-yes"
							selected={currentValue === true}
							ref={ref}
							value={true}
							onChange={onChange}
							src={JA}
						/>
						<AttendanceButton
							id="attend-no"
							selected={currentValue === false}
							ref={ref}
							value={false}
							onChange={onChange}
							src={NEJ}
						/>
						{/* {values.map(({ label, value }) => {
							const id = `${name}-${label}-${value}`;
							const selected = currentValue === value;
							return (
							);
						})} */}
					</div>
				)}
			/>
		</>
	);
}

const AttendanceButton = ({
	id,
	selected,
	ref,
	onChange,
	value,
	src,
}: {
	id: string;
	selected: boolean;
	ref: RefCallBack;
	onChange: (...event: any[]) => void;
	value: boolean;
	src: any;
}) => {
	return (
		<label
			key={id}
			className={`flex flex-col items-center justify-center rounded-md gap-2 w-auto md:w-44 aspect-square transition-colors cursor-pointer ${
				selected ? "" : ""
			}`}
		>
			<input
				id={id}
				type="radio"
				className="hidden w-2 h-2 border-gray-300 md:w-4 md:h-4 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
				ref={ref}
				checked={selected}
				onChange={() => onChange(value)}
			/>
			<Image
				src={src}
				alt=""
				className={`transition-opacity hover:opacity-100 ${
					selected ? "opacity-100" : "opacity-20"
				}`}
			/>
		</label>
	);
};
