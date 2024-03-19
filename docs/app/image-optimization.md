# Image Optimization

If your project has a requirement for image content that doesn't lend itself to something like SVG, you may want to use the image optimization functionality that NextJS provides in order to better optimize your image(s) for improved performance and UX.

[The NextJS docs](https://nextjs.org/docs/app/building-your-application/optimizing/images) have extensive info on how to use the `<Image>` component, but a couple of items are worth noting:

* When running in production (not when running `next dev`), you will need to ensure that the `sharp` library is installed. 

  ```bash
  npm i sharp
  ```
* Depending on your tech stack, you may need to ensure that the `.next/cache/images` folder is present and write permissions have been applied 