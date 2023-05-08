/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  webpack(config) {
    // 为 /\.(js|mjs|jsx|ts|tsx)$/ 添加 .ts 和 .tsx 文件扩展名。
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
}

module.exports = nextConfig
