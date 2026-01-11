import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'ded6383e44a74727b02d7e093e7c2c32';
const BASE_URL = 'https://api.rawg.io/api';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint') || '/games';

    // Build query params
    const params = new URLSearchParams();
    params.append('key', API_KEY);

    // Forward all other params
    searchParams.forEach((value, key) => {
        if (key !== 'endpoint') {
            params.append(key, value);
        }
    });

    try {
        const response = await fetch(`${BASE_URL}${endpoint}?${params.toString()}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
