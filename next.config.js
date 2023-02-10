/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	ssr: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
