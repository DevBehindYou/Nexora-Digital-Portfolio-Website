import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CaseStudy } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ caseStudies });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const cs = await CaseStudy.create(body);
    return NextResponse.json({ caseStudy: cs }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
