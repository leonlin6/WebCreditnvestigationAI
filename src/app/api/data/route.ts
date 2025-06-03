import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const year = searchParams.get('year');

    if (!company || !year) {
      return NextResponse.json(
        { error: 'Company and year parameters are required' },
        { status: 400 }
      );
    }

    // Mock data - replace this with your actual API call
    const mockData = {
      company,
      year,
      revenue: Math.floor(Math.random() * 1000000000),
      profit: Math.floor(Math.random() * 100000000),
      employees: Math.floor(Math.random() * 100000),
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
} 