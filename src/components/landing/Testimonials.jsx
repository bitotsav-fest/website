import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";

const testimonials = [
  {
    author: {
      name: "Arijit Singh",
      handle: "@arijitsingh",
      avatar:
        "https://i.scdn.co/image/ab6761610000e5eb5ba2d75eb08a2d672f9b69b7",
    },
    text: "Bitotsav's energy was electrifying! The audience's passion for music made my performance unforgettable.",
    href: "https://twitter.com/arijitsingh",
  },
  {
    author: {
      name: "Vishal Dadlani",
      handle: "@vishaldadlani",
      avatar:
        "https://cdn-images.dzcdn.net/images/artist/f400dce93102e302bc6595cd37ff87d2/1900x1900-000000-80-0-0.jpg",
    },
    text: "The organization at Bitotsav was top-notch. It's a platform that truly celebrates young talent and creativity.",
    href: "https://twitter.com/vishaldadlani",
  },
  {
    author: {
      name: "Shreya Ghoshal",
      handle: "@shreyaghoshal",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Shreya_Ghoshal_at_Filmfare_Awards_South.jpg",
    },
    text: "Bitotsav's crowd was amazing! Their enthusiasm made me want to keep singing all night long.",
  },
  {
    author: {
      name: "Zakir Khan",
      handle: "@zakirkhan",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Zakir_khan_2.jpg/800px-Zakir_khan_2.jpg",
    },
    text: "The laughter and energy at Bitotsav were infectious. It's a joy to perform for such a vibrant audience!",
    href: "https://twitter.com/zakirkhan",
  },
];

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Celebrated by stars across India"
      description="Join the excitement at Bitotsav, where top artists create unforgettable moments"
      testimonials={testimonials}
    />
  );
}
