import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Blog } from '@/models';

export async function GET(_, { params }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id).lean();
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    if (body.published && !body.publishedAt) body.publishedAt = new Date();
    const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
