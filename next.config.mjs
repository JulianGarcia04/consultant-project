/** @type {import('next').NextConfig} */
const nextConfig = {
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
