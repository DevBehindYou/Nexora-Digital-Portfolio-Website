import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Hero } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne({ active: true }).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ hero });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const hero = await Hero.findOneAndUpdate(
      {},
      { ...body, active: true },
      { upsert: true, new: true, runValidators: true }
    );
    return NextResponse.json({ hero });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
