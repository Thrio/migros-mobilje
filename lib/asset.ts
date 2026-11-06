// Demo builds live under a sub-path (demo.thrio.co/<client-name>), set through NEXT_PUBLIC_BASE_PATH.
// Next.js adds the base path to routes and /_next files, but not to plain image, video or file paths,
// so every such path goes through asset().
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string): string => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
