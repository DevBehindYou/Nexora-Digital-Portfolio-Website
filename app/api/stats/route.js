import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Stat } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const stats = await Stat.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ stats });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const count = await Stat.countDocuments();
    const stat = await Stat.create({ ...body, order: body.order ?? count });
    return NextResponse.json({ stat }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
