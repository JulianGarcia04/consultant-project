/** @type {import('next').NextConfig} */
const nextConfig = {
	headers: () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "Cache-Control",
					value: "no-store",
				},
			],
		},
	],
	images: {
		remotePatterns: [
			{
				hostname: "firebasestorage.googleapis.com",
				protocol: "https",
			},
			{
				hostname: "storage.googleapis.com",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
