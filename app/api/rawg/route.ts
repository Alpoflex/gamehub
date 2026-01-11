import { NextRequest, NextResponse } from 'next/server';

// Use a fresh API key
const API_KEY = '3c3c63ad09msh2a4f0ec8b3e3c3cp1a0e6ejsn9e0f4d8fc64a';
const BASE_URL = 'https://api.rawg.io/api';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const endpoint = searchParams.get('endpoint') || '/games';

    // Remove 'endpoint' and build clean params
    const params = new URLSearchParams();
    params.set('key', API_KEY);

    searchParams.forEach((value, key) => {
        if (key !== 'endpoint') {
            params.set(key, value);
        }
    });

    const url = `${BASE_URL}${endpoint}?${params.toString()}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'GameHub/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error: any) {
        console.error('RAWG API Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch from RAWG API' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        );
    }
}
