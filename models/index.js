import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

/* ─── Hero ─────────────────────────────────────────────── */
const heroSchema = new Schema({
  headline:        { type: String, default: 'Engineering Digital Excellence' },
  subheadline:     { type: String, default: 'Transforming ideas into powerful digital experiences' },
  description:     { type: String, default: 'We craft world-class digital products, brands, and experiences that drive growth.' },
  ctaPrimary:      { type: String, default: 'Start a Project' },
  ctaPrimaryLink:  { type: String, default: '#contact' },
  ctaSecondary:    { type: String, default: 'View Our Work' },
  ctaSecondaryLink:{ type: String, default: '#case-studies' },
  badge:           { type: String, default: '✦ Award-Winning Digital Agency' },
  active:          { type: Boolean, default: true },
}, { timestamps: true });

/* ─── Service ───────────────────────────────────────────── */
const serviceSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String, default: 'code' },
  features:    [{ type: String }],
  order:       { type: Number, default: 0 },
  active:      { type: Boolean, default: true },
}, { timestamps: true });

/* ─── Blog ──────────────────────────────────────────────── */
const blogSchema = new Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  excerpt:     { type: String, default: '' },
  content:     { type: String, default: '' },
  author:      { type: String, default: 'Nexora Team' },
  tags:        [{ type: String }],
  readTime:    { type: String, default: '5 min read' },
  published:   { type: Boolean, default: false },
  publishedAt: { type: Date },
  coverColor:  { type: String, default: 'blue' },
}, { timestamps: true });

/* ─── CaseStudy ─────────────────────────────────────────── */
const caseStudySchema = new Schema({
  title:       { type: String, required: true },
  client:      { type: String, default: '' },
  industry:    { type: String, default: '' },
  description: { type: String, default: '' },
  challenge:   { type: String, default: '' },
  solution:    { type: String, default: '' },
  results:     { type: String, default: '' },
  stats:       [{ label: String, value: String }],
  tags:        [{ type: String }],
  featured:    { type: Boolean, default: false },
  accentColor: { type: String, default: 'blue' },
  active:      { type: Boolean, default: true },
}, { timestamps: true });

/* ─── CTA ───────────────────────────────────────────────── */
const ctaSchema = new Schema({
  headline:         { type: String, default: "Ready to Build Something Remarkable?" },
  subheadline:      { type: String, default: '' },
  description:      { type: String, default: "Let's collaborate to create digital experiences your users will love." },
  primaryCta:       { type: String, default: 'Start Your Project' },
  primaryCtaLink:   { type: String, default: 'mailto:hello@nexora.digital' },
  secondaryCta:     { type: String, default: 'Schedule a Call' },
  secondaryCtaLink: { type: String, default: '#' },
  badge:            { type: String, default: 'Limited spots available for Q1 2025' },
  active:           { type: Boolean, default: true },
}, { timestamps: true });

/* ─── Ad ────────────────────────────────────────────────── */
const adSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  ctaText:     { type: String, default: 'Learn More' },
  ctaLink:     { type: String, default: '#' },
  badge:       { type: String, default: '' },
  accentColor: { type: String, default: 'blue', enum: ['blue','purple','cyan','pink','green'] },
  active:      { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

/* ─── Stat ──────────────────────────────────────────────── */
const statSchema = new Schema({
  label:  { type: String, required: true },
  value:  { type: String, required: true },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' },
  order:  { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Hero       = models.Hero       || model('Hero', heroSchema);
export const Service    = models.Service    || model('Service', serviceSchema);
export const Blog       = models.Blog       || model('Blog', blogSchema);
export const CaseStudy  = models.CaseStudy  || model('CaseStudy', caseStudySchema);
export const CTA        = models.CTA        || model('CTA', ctaSchema);
export const Ad         = models.Ad         || model('Ad', adSchema);
export const Stat       = models.Stat       || model('Stat', statSchema);
