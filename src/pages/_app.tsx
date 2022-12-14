import "../styles/globals.css";
import { Layout } from "layout/Layout";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "pages/api/trpc/[trpc]";
import { ReactQueryDevtools } from "react-query/devtools";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<ReactQueryDevtools />
		</>
	);
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
			: "http://localhost:3000/api/trpc";
		return {
			url,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
})(MyApp);
