import type { NextPage } from "next";
import { trpc } from "utils/trpc";
import DataTable from "react-data-table-component";
import { AttendingGuest } from "models/guest";
import { useState, useMemo } from "react";
import { useDebounce } from "hooks/useDebounce";
import { Guest } from "server/routers/guests";
import { parseJSON, format } from "date-fns";
const Gaster: NextPage = () => {
	const [filter, setFilter] = useState("");
	const { data } = trpc.useQuery(["guests.list"]);
	const filterValue = useDebounce(filter.trim(), 300);

	const filteredData = useMemo(
		() => data?.filter((x) => contains(`${x.firstName} ${x.lastName}`, filterValue)) ?? [],
		[filterValue, data],
	);

	console.log("data", data);

	return (
		<section className="bg-white">
			<header className="mb-8">
				<h1 className="flex gap-8 text-2xl">Gäster</h1>
				<ol>
					<li>
						Kommer:
						{data?.filter((x) => x.rsvp === true).length ?? 0}
					</li>
					<li>Kommer inte: {data?.filter((x) => x.rsvp === false).length ?? 0}</li>
				</ol>
				<ol>
					<li>
						Kött:{" "}
						{data?.filter((x) => x.rsvp === true && x.menuType === "MEAT").length ?? 0}
					</li>
					<li>
						Vegetariskt:{" "}
						{data?.filter((x) => x.rsvp === true && x.menuType === "VEGETARIAN")
							.length ?? 0}
					</li>
					<li>
						Veganskt:{" "}
						{data?.filter((x) => x.rsvp === true && x.menuType === "VEGAN").length ?? 0}
					</li>
				</ol>
			</header>
			<section>
				<label className="flex items-center gap-2">
					<span>Filter:</span>
					<input
						type="search"
						onChange={(e) => setFilter(e.currentTarget.value)}
						className="px-4 py-2 border w-44"
					/>
				</label>
			</section>
			<article className="w-[3000px]">
				<DataTable
					striped
					defaultSortFieldId={"created_at"}
					defaultSortAsc={false}
					columns={[
						{
							id: "firstName",
							name: "Förnamn",
							sortField: "firstName",
							selector: (row) => row.firstName,
							sortable: true,
							sortFunction: caseInsensitiveSort("firstName"),
						},
						{
							name: "Efternamn",
							selector: (row) => row.lastName,
							sortable: true,
							sortFunction: caseInsensitiveSort("lastName"),
						},
						{
							name: "OSA",
							selector: (row) => (row.rsvp ? "Kommer" : "Kommer inte"),
							sortable: true,
						},
						{
							name: "Meny",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success ? attending.data.menuType : "-";
							},
							sortable: true,
						},
						{
							name: "Allergier",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success
									? attending.data.hasAllergies
										? `Ja - ${attending.data.allergies}`
										: "Nej"
									: "-";
							},
							wrap: true,
							sortable: true,
						},
						{
							name: "Alkoholfritt",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success
									? attending.data.alcoholFree
										? "Ja"
										: "Nej"
									: "-";
							},
							sortable: true,
						},
						{
							name: "Email",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success ? attending.data.email : "-";
							},
							wrap: true,
							sortable: true,
						},
						{
							name: "Telefon",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success ? attending.data.phone : "-";
							},
							sortable: true,
						},
						{
							name: "Från steam",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success
									? attending.data.fromHotel
										? "Ja"
										: "Nej"
									: "-";
							},
							sortable: true,
						},
						{
							name: "Från vigseln",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success
									? attending.data.fromWedding
										? "Ja"
										: "Nej"
									: "-";
							},
							sortable: true,
						},
						{
							name: "Från middagen",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success
									? attending.data.fromDinner
										? "Ja"
										: "Nej"
									: "-";
							},
							sortable: true,
						},
						{
							name: "Får mig att dansa",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success ? attending.data.makesMeDance ?? "-" : "-";
							},
							grow: 5,
							wrap: true,
							sortable: true,
						},
						{
							name: "Meddelande",
							selector: (row) => {
								let attending = AttendingGuest.safeParse(row);
								return attending.success ? attending.data.message ?? "" : "-";
							},
							grow: 5,
							wrap: true,
							sortable: true,
						},
						{
							name: "Skapad",
							sortField: "created_at",
							selector: (row) => {
								let date = row.created_at ? parseJSON(row.created_at) : undefined;
								return date ? format(date, "yyyy-MM-dd HH:mm") : "-";
							},
							sortable: true,
						},
					]}
					data={filteredData}
				/>
			</article>
		</section>
	);
};

export default Gaster;

const contains = (a: string, b: string) => a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
const caseInsensitiveSort = (property: keyof Guest) => (rowA: Guest, rowB: Guest) => {
	const propA = (rowA[property] as string) ?? "";
	const propB = (rowB[property] as string) ?? "";

	const a = propA.toLowerCase();
	const b = propB.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};
