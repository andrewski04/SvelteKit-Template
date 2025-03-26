# Interface: PageData

Defined in: node\_modules/@sveltejs/kit/types/index.d.ts:2530

Defines the common shape of the [page.data state](https://svelte.dev/docs/kit/$app-state#page) and [$page.data store](https://svelte.dev/docs/kit/$app-stores#page) - that is, the data that is shared between all pages.
The `Load` and `ServerLoad` functions in `./$types` will be narrowed accordingly.
Use optional properties for data that is only present on specific pages. Do not add an index signature (`[key: string]: any`).
