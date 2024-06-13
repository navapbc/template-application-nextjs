# Image optimization

If your project includes image content that doesn't lend itself to vector formats like SVG, you may want to use the [image optimization functionality that Next.js provides](https://nextjs.org/docs/app/building-your-application/optimizing/images), in order to better optimize your image(s) for improved performance and UX.

When running in production (not when running `next dev`), [Next.js recommends installing the `sharp` library](https://nextjs.org/docs/app/building-your-application/deploying#image-optimization):

```sh
npm i sharp
```
