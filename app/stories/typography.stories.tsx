import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Core/Typography",
};

export default meta;

export const GlobalStyles: StoryObj = {
  render: () => (
    <>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p className="usa-intro">Intro text</p>
      <p>Paragraph text</p>
      <p>
        <a href="#">Link</a> and{" "}
        <a href="#" className="usa-link--external">
          External link
        </a>
      </p>
      <ul>
        <li>Unordered list item: A</li>
        <li>Unordered list item: B</li>
      </ul>
      <ol>
        <li>Ordered list item</li>
        <li>Ordered list item</li>
      </ol>
    </>
  ),
};

export const SizeUtilities: StoryObj = {
  render: () => (
    <>
      <h1 className="font-heading-lg">H1 with smaller text size</h1>
      <h2 className="font-heading-2xl">H2 with larger text size</h2>
      <p className="font-body-2xs">Extra extra small paragraph</p>
    </>
  ),
};

export const FamilyUtilities: StoryObj = {
  render: () => (
    <>
      <h1 className="font-family-sans">Sans heading</h1>
      <p className="font-family-serif">Serif body</p>
    </>
  ),
};

export const ResponsiveUtilities: StoryObj = {
  render: () => (
    <>
      <h1 className="font-heading-lg tablet:font-heading-xl desktop:font-heading-2xl">
        Responsive heading
        <br />
        (lg on mobile, xl on tablet, 2xl on desktop)
      </h1>
      <p className="font-body-2xs tablet:font-body-sm desktop:font-body-md">
        Responsive paragraph
        <br />
        (2xs on mobile, sm on tablet, md on desktop)
      </p>
    </>
  ),
};

export const ColorUtilities: StoryObj = {
  render: () => (
    <>
      <h1>Examples of text color utility classes (not comprehensive):</h1>
      <p className="text-base">Base</p>
      <p className="text-accent-warm-dark">Accent warm dark</p>
      <p className="text-success-dark">Success dark</p>
      <p className="text-error-dark">Error dark</p>
    </>
  ),
};
