import { NextResponse } from 'next/server';

// This is a mock API endpoint. Replace this with your actual API endpoint
export async function GET() {
  try {
    // Mock data - replace this with your actual API call
    const companies = [
      'Apple Inc.',
      'Microsoft Corporation',
      'Amazon.com Inc.',
      'Alphabet Inc.',
      'Meta Platforms Inc.',
      'Tesla Inc.',
      'NVIDIA Corporation',
      'Berkshire Hathaway Inc.',
      'JPMorgan Chase & Co.',
      'Visa Inc.'
    ];

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
} 