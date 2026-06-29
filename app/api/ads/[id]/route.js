import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Ad } from '@/models';

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const ad = await Ad.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!ad) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ad });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    await Ad.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
