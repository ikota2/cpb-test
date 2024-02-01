export function extractImageUrls(html) {
    const imageUrlPattern = /https?:\/\/\S+\.(jpg|jpeg|png|gif|bmp|svg)/g;
    return Array.from(html.matchAll(imageUrlPattern)).map(match => match[0]);
}
