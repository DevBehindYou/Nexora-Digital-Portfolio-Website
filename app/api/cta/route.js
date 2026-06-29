import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CTA } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const cta = await CTA.findOne({ active: true }).lean();
    return NextResponse.json({ cta });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const cta = await CTA.findOneAndUpdate({}, { ...body, active: true }, { upsert: true, new: true, runValidators: true });
    return NextResponse.json({ cta });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
