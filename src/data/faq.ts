import type { FAQCategory } from '@/types';

export const faqCategories: FAQCategory[] = [
  {
    id: 'pricing',
    name: 'Pricing',
    icon: 'DollarSign',
    questions: [
      {
        id: 'pricing-1',
        question: 'Why are prices listed as "Starting from"?',
        answer:
          'Our listed prices are estimates based on a vehicle in average condition. The final price is confirmed after we inspect your vehicle and assess factors like current condition, contamination level, and any special requirements. This ensures you only pay for what your vehicle actually needs.',
      },
      {
        id: 'pricing-2',
        question: 'Do you charge extra for very dirty vehicles?',
        answer:
          'Vehicles with excessive dirt, pet hair, stains, or neglected paint may require additional time and products. We will always communicate any price adjustments before starting work so there are no surprises. You can upload photos during booking for a more accurate estimate.',
      },
      {
        id: 'pricing-3',
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards, debit cards, cash, and mobile payment options (Apple Pay, Google Pay). Payment is collected upon service completion.',
      },
    ],
  },
  {
    id: 'duration',
    name: 'Service Duration',
    icon: 'Clock',
    questions: [
      {
        id: 'duration-1',
        question: 'How long does a basic wash take?',
        answer:
          'A basic wash typically takes 45 minutes to 1.5 hours depending on vehicle size and condition. Sedans are usually on the shorter side, while trucks and very dirty vehicles take longer.',
      },
      {
        id: 'duration-2',
        question: 'How long does a full interior + exterior detail take?',
        answer:
          'A full detail usually takes 3 to 5 hours depending on vehicle size and condition. We recommend planning for half a day. We will give you a more precise time estimate after reviewing your vehicle photos.',
      },
      {
        id: 'duration-3',
        question: 'How long does ceramic coating take?',
        answer:
          'Ceramic coating is a multi-step process that typically requires 1 to 2 days. This includes paint correction, surface preparation, coating application, and curing time. We will coordinate drop-off and pick-up times with you.',
      },
    ],
  },
  {
    id: 'service-area',
    name: 'Service Area',
    icon: 'MapPin',
    questions: [
      {
        id: 'area-1',
        question: 'Do you offer mobile detailing or do I need to come to you?',
        answer:
          'We operate from our dedicated detailing facility to ensure the best results with proper lighting, water filtration, and controlled environment. Drop-off and pick-up are at our location. We may offer mobile services for ceramic coating clients — ask us for details.',
      },
      {
        id: 'area-2',
        question: 'What is your service area?',
        answer:
          'We serve the metropolitan area and surrounding communities within a 30-mile radius of our facility. Check our contact page for our exact location and map. If you are outside our area, contact us and we can discuss options.',
      },
    ],
  },
  {
    id: 'vehicle-prep',
    name: 'Vehicle Preparation',
    icon: 'CarFront',
    questions: [
      {
        id: 'prep-1',
        question: 'Do I need to prepare my vehicle before bringing it in?',
        answer:
          'We recommend removing any personal valuables and large loose items from the vehicle before your appointment. You do not need to pre-clean — that is our job! If you have specific stains or problem areas, let us know during booking so we can prepare the right products.',
      },
      {
        id: 'prep-2',
        question: 'Should I remove car seats before the appointment?',
        answer:
          'Yes, please remove car seats, booster seats, and any aftermarket accessories you would like us to clean around (or underneath). This allows us to do a thorough job on the upholstery and carpet. We are not responsible for car seat reinstallation.',
      },
    ],
  },
  {
    id: 'cancellation',
    name: 'Cancellation Policy',
    icon: 'CalendarX',
    questions: [
      {
        id: 'cancel-1',
        question: 'What is your cancellation policy?',
        answer:
          'We ask for at least 24 hours notice for cancellations or rescheduling. Cancellations with less than 24 hours notice may be subject to a cancellation fee. We understand emergencies happen — just communicate with us and we will work with you.',
      },
      {
        id: 'cancel-2',
        question: 'Can I reschedule my appointment?',
        answer:
          'Absolutely! You can reschedule by calling or emailing us at least 24 hours before your appointment at no charge. Same-day rescheduling is subject to availability and may carry a fee. We will do our best to accommodate your new preferred time.',
      },
    ],
  },
];
