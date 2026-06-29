import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const contactSchema = new Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  budget:  { type: String, default: '' },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true });

const Contact = models.Contact || model('Contact', contactSchema);

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ contacts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name?.trim())    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!body.email?.trim())   return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    if (!body.message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
