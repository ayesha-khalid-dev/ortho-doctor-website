export type Service = {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  highlights: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "joint-replacement",
    title: "Joint Replacement",
    icon: "🦴",
    shortDescription:
      "Advanced hip and knee replacement surgery to restore mobility and relieve chronic pain.",
    fullDescription:
      "Our joint replacement program uses modern surgical techniques to replace damaged hip or knee joints with durable implants. This helps patients regain mobility, reduce pain, and return to daily activities faster, with a focus on minimally invasive approaches and personalized recovery plans.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
    highlights: [
      "Hip and knee replacement",
      "Minimally invasive techniques",
      "Personalized rehabilitation plan",
      "Long-term mobility support",
    ],
  },
  {
    slug: "fracture-care",
    title: "Fracture Care",
    icon: "🩹",
    shortDescription:
      "Prompt diagnosis and treatment of fractures, from simple casting to complex surgical fixation.",
    fullDescription:
      "From hairline fractures to complex breaks, our fracture care service covers accurate diagnosis with imaging, and treatment ranging from casting and bracing to surgical fixation with plates, screws, or rods — all aimed at proper bone healing and restoring full function.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&q=80",
    highlights: [
      "X-ray based diagnosis",
      "Casting and bracing",
      "Surgical fixation when needed",
      "Follow-up healing checks",
    ],
  },
  {
    slug: "sports-injuries",
    title: "Sports Injuries",
    icon: "🏃",
    shortDescription:
      "Specialized treatment for ligament tears, sprains, and injuries affecting athletes and active individuals.",
    fullDescription:
      "We treat common sports-related injuries including ACL/ligament tears, sprains, dislocations, and overuse injuries. Our approach combines accurate diagnosis, non-surgical management where possible, and surgical repair when necessary — helping athletes and active individuals return to their sport safely.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    highlights: [
      "Ligament and sprain treatment",
      "Non-surgical rehab programs",
      "Surgical repair when required",
      "Return-to-sport guidance",
    ],
  },
  {
    slug: "spine-care",
    title: "Spine Care",
    icon: "🦾",
    shortDescription:
      "Comprehensive evaluation and management of back and neck conditions, from pain to complex spinal disorders.",
    fullDescription:
      "Our spine care service addresses conditions ranging from general back and neck pain to disc problems and spinal deformities. We prioritize conservative treatment first — physical therapy and pain management — with surgical options available for more complex spinal disorders.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    highlights: [
      "Back and neck pain evaluation",
      "Disc and nerve-related conditions",
      "Conservative treatment first",
      "Surgical options when needed",
    ],
  },
  {
    slug: "knee-care",
    title: "Knee Care",
    icon: "🦵",
    shortDescription:
      "Diagnosis and treatment of knee pain, ligament injuries, meniscus tears and arthritis.",
    fullDescription:
      "Our knee care service covers everything from everyday knee pain and swelling to ligament and meniscus injuries and worn-out joints. We start with an accurate diagnosis and prefer non-surgical options such as physiotherapy and medication where possible, with surgery available when it is the best choice for you.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
    highlights: [
      "Knee pain and swelling evaluation",
      "Ligament and meniscus injuries",
      "Physiotherapy-first approach",
      "Surgical options when needed",
    ],
  },
  {
    slug: "shoulder-elbow-care",
    title: "Shoulder & Elbow Care",
    icon: "💪",
    shortDescription:
      "Treatment for shoulder pain, stiffness, dislocations and elbow problems like tennis elbow.",
    fullDescription:
      "We diagnose and treat shoulder and elbow conditions including frozen shoulder, rotator cuff problems, dislocations and tennis or golfer's elbow. Care plans combine guided exercises, pain relief and, when required, surgical repair, so you can lift, reach and grip comfortably again.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    highlights: [
      "Frozen shoulder and rotator cuff care",
      "Dislocation treatment",
      "Tennis and golfer's elbow",
      "Guided strengthening exercises",
    ],
  },
  {
    slug: "hip-care",
    title: "Hip Care",
    icon: "🚶",
    shortDescription:
      "Care for hip pain, fractures and arthritis to help you walk, sit and climb stairs comfortably.",
    fullDescription:
      "Hip pain can make everyday movement difficult. Our hip care service evaluates the cause of your pain and offers treatment ranging from medication and physiotherapy to fracture fixation and hip replacement, with a clear recovery plan after every procedure.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    highlights: [
      "Hip pain diagnosis",
      "Hip fracture treatment",
      "Hip replacement surgery",
      "Post-treatment recovery plan",
    ],
  },
  {
    slug: "arthritis-care",
    title: "Arthritis Care",
    icon: "🖐️",
    shortDescription:
      "Long-term management of joint pain and stiffness to keep you active and comfortable.",
    fullDescription:
      "Arthritis affects joints across the body and needs steady, long-term care. We help you manage pain and stiffness with a mix of medication, lifestyle guidance, physiotherapy and, in advanced cases, surgical options, so you can stay active for longer.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&q=80",
    highlights: [
      "Joint pain and stiffness management",
      "Medication and lifestyle guidance",
      "Physiotherapy support",
      "Surgical options in advanced cases",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}