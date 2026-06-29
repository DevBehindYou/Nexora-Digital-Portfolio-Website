import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Ad } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const ads = await Ad.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ ads });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const count = await Ad.countDocuments();
    const ad = await Ad.create({ ...body, order: body.order ?? count });
    return NextResponse.json({ ad }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
