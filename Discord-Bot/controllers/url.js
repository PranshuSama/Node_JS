import URL from '../models/url.js';

async function createShortURL(originalUrl) {
  if (!originalUrl) {
    throw new Error('URL is required');
  }

  try {
    const url = await URL.create({
      redirectURL: originalUrl,
    });
    return `http://localhost:3000/${url.shortId}`;
  } catch (error) {
    console.error('Error creating short URL:', error);
    throw new Error('Could not create short URL');
  }
}

export { createShortURL };
