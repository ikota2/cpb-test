import { extractImageUrls } from './extractImageUrls';

describe('extractImageUrls', () => {
    test('should extract a single image URL', () => {
        const html = '<img src="http://example.com/image.jpg" alt="good phone">';
        expect(extractImageUrls(html)).toEqual(['http://example.com/image.jpg']);
    });

    test('should extract multiple image URLs', () => {
        const html = '<img src="http://example.com/image1.jpg" alt="good boy"><img src="http://example.com/image2.jpg" alt="good boy">';
        expect(extractImageUrls(html)).toEqual(['http://example.com/image1.jpg', 'http://example.com/image2.jpg']);
    });

    test('should return an empty array if no images found', () => {
        const html = '<p>No images here</p>';
        expect(extractImageUrls(html)).toEqual([]);
    });
});
