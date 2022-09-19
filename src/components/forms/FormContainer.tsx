import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Props<T extends FieldValues> = {
	formContext: UseFormReturn<T>;
	handleSubmit: SubmitHandler<T>;
	"data-testid"?: string;
};

export function FormContainer<T extends FieldValues>({
	formContext,
	handleSubmit,
	children,
	...rest
}: PropsWithChildren<Props<T>>) {
	return (
		<FormProvider {...formContext}>
			<form
				data-testid={rest["data-testid"]}
				onSubmit={formContext.handleSubmit(handleSubmit)}
				role="form"
			>
				{children}
			</form>
			<DevTool control={formContext.control} />
		</FormProvider>
	);
}
