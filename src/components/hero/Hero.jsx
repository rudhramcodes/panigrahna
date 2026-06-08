const HERO_IMAGE =
  "https://res.cloudinary.com/dvsrgdyi7/image/upload/f_auto,q_auto/DSC06503_1_khqkxz";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-[center_20%]"
        src={HERO_IMAGE}
        alt="Panigrahna"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />
    </section>
  );
}
