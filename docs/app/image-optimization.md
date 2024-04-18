# Image optimization

If your project includes image content that doesn't lend itself to vector formats like SVG, you may want to use the [image optimization functionality that Next.js provides](https://nextjs.org/docs/app/building-your-application/optimizing/images), in order to better optimize your image(s) for improved performance and UX.

When running in production (not when running `next dev`), you will need to ensure that the `sharp` library is installed:

```sh
npm i sharp
```
