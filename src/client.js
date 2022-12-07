import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "hb5rqtlc",
  dataset: "production",
  apiVersion: "1",
  useCdn: true,
  token:
    "skg4sQLUMGzGsSJGgBs3ShFIHEWECahpCPBnargidYMyZigLNbN7MsMlcSpdqLre0mkEhg9K4a1y9dWUbpXYcegFoXBC3gpOFKDk41khADRprRgonUoUIEvbtd0Yg2m42Jk66ZZYxJvTzuKM3dga3rJJZHA5DeWZ0IxSrQPg9mB3AidjP7AL",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
