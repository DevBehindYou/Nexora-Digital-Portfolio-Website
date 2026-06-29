import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Stat } from '@/models';

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const stat = await Stat.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!stat) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ stat });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    await Stat.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
