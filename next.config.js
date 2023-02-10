/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	ssr: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
