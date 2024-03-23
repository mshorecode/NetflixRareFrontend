module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com', 'tse3.mm.bing.net', 'media.nbclosangeles.com'],
  },
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
};
