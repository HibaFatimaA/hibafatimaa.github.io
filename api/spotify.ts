import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  return res.json();
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    const tokenData = await getAccessToken();

    if (!tokenData.access_token) {
      return res.status(500).json({ isPlaying: false, error: 'no_token', detail: tokenData });
    }

    const { access_token } = tokenData;

    const npRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (npRes.status === 204) {
      return res.json({ isPlaying: false, reason: '204_no_content' });
    }

    if (npRes.status !== 200) {
      return res.json({ isPlaying: false, reason: `status_${npRes.status}` });
    }

    const data = await npRes.json();

    if (!data?.item) {
      return res.json({ isPlaying: false, reason: 'no_item' });
    }

    return res.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
      albumArt: data.item.album.images[2]?.url ?? data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    });
  } catch (e: any) {
    return res.status(500).json({ isPlaying: false, error: e.message });
  }
}
