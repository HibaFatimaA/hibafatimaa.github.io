const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken() {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN ?? '',
    }),
  });
  return res.json();
}

export default async function handler(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
    'Content-Type': 'application/json',
  };

  try {
    const tokenData = await getAccessToken();

    if (!tokenData.access_token) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: 'no_token', detail: tokenData }),
        { status: 500, headers }
      );
    }

    const npRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (npRes.status === 204) {
      return new Response(JSON.stringify({ isPlaying: false }), { headers });
    }

    if (npRes.status !== 200) {
      return new Response(
        JSON.stringify({ isPlaying: false, reason: `status_${npRes.status}` }),
        { headers }
      );
    }

    const data = await npRes.json();

    if (!data?.item) {
      return new Response(JSON.stringify({ isPlaying: false }), { headers });
    }

    return new Response(JSON.stringify({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
      albumArt: data.item.album.images[2]?.url ?? data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    }), { headers });

  } catch (e: any) {
    return new Response(
      JSON.stringify({ isPlaying: false, error: e.message }),
      { status: 500, headers }
    );
  }
}

export const config = { runtime: 'edge' };
