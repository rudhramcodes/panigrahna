const HERO_IMAGE =
  "https://res-console.cloudinary.com/dvsrgdyi7/thumbnails/v1/image/upload/v1780916247/VEtTMDUyMjVfMV9qeWVvdGc=/drilldown";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-[center_30%]"
        src={HERO_IMAGE}
        alt="Panigrahna"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />
    </section>
  );
}
