/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	compiler: {
		// styledComponents: true,
	},
};

module.exports = nextConfig;
