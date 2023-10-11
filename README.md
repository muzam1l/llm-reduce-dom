# Html DOM reducer for LLM's

[Demo](https://llm-reduce-dom.vercel.app/)

The process involves reducing HTML content into straightforward JSON objects, mapped according to specific roles. Non-visual elements are intentionally excluded to facilitate comprehension by language models. The resulting output takes the form of either strings or adheres to the following simple interface:

```typescript
type SimplifiedElement = {
    role: string;
    text?: string;
    children?: SimplifiedElement[];
};
```

Elements are removed based on criteria such as aria roles, data attributes, or element types. Additionally, the output tree is further simplified by flattening single-child elements and eliminating non-textual components.

## Building

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses the new App router, Server Components and those new React goodies!

It fetches the page html in NextJS Server Actions and sends the client to process. Client uses the `DomParser` to parse the html and then recursively processes the elements into the simplified tree.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
