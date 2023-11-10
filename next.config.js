/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "static.amayama.com",
      "www.amayama.com",
      "toyota-img.amayama.com",
      "honda-img.amayama.com",
    ],
  },
  output: {
    // Set the directory where the exported files will be generated
    dir: "out", // You can change this to a different directory if needed
  },
  // Specify paths to exclude from static site generation
  exclude: ["/api/auth/[...nextauth]", "/api/products/[productid]"],
  // output: "export",
};

module.exports = nextConfig;
