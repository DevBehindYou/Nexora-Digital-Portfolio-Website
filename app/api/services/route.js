import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Service } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ services });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const count = await Service.countDocuments();
    const service = await Service.create({ ...body, order: body.order ?? count });
    return NextResponse.json({ service }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
