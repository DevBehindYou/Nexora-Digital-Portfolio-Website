import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Blog } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ blogs });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (body.published && !body.publishedAt) body.publishedAt = new Date();
    const blog = await Blog.create(body);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
