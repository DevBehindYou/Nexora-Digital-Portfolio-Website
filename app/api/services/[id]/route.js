import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Service } from '@/models';

export async function GET(_, { params }) {
  try {
    await dbConnect();
    const service = await Service.findById(params.id).lean();
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ service });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ service });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    await Service.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
