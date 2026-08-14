import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn the story behind Detail Dudes, our certifications, and the service area we cover.',
};

export default function AboutPage() {
  return <AboutContent />;
}
