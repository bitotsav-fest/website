import InteractiveBentoGallery from "@/components/blocks/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Bitotsav Opening Ceremony",
    desc: "Grand inauguration of Bitotsav",
    url: "https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/campusfeed/1195367_1717131539ve6GCX.jpg",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "Dance Performance",
    desc: "Energetic cultural showcase",
    url: "https://cdn.pixabay.com/video/2015/11/03/1257-144566582_tiny.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 3,
    type: "video",
    title: "Tech Exhibition",
    desc: "Innovative student projects",
    url: "https://cdn.pixabay.com/video/2015/11/07/1275-145116912_medium.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "video",
    title: "Musical Night",
    desc: "Star-studded concert event",
    url: "https://cdn.pixabay.com/video/2015/11/07/1275-145116912_medium.mp4",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "Robotics Competition",
    desc: "Battle of the bots",
    url: "https://cdn.pixabay.com/video/2023/06/12/166965-835670925_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "video",
    title: "Fashion Show",
    desc: "Trendsetting campus styles",
    url: "https://cdn.pixabay.com/video/2023/12/10/192667-893427260_tiny.mp4",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Closing Ceremony",
    desc: "Memorable festival finale",
    url: "https://i.ytimg.com/vi/7JFkshvzGb4/maxresdefault.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export function BentoGridGallery() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Bitotsav Highlights"
        description="Explore the vibrant moments of our annual techno-cultural fest"
      />
    </div>
  );
}
