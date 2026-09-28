import { familia } from "@/lib/fonts";

export default function SmallScreenGate() {
  return (
    <div className={`small-screen ${familia.className}`}>
      <div className="small-screen__dots" aria-hidden="true" />
      <p className="small-screen__text">
        Esta web se tiene que abrir en una pantalla de más de 12 pulgadas.
      </p>
    </div>
  );
}
