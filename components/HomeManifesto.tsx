import { familia } from "@/lib/fonts";

export default function HomeManifesto() {
  return (
    <section className="home-manifesto" aria-label="Manifiesto">
      <div className="home-manifesto__inner">
        <p className={`home-manifesto__text ${familia.className}`}>
          Somos seres con gustos propios, hobbies, ideas, y esas pequeñas cosas
          que nos hacen únicos. Por eso, nuestros espacios tendrían que reflejar
          nuestra identidad; ser refugios que transmitan paz, calidez y
          sensibilidad, dejando siempre lugar para que florezca la creatividad
          propia.
        </p>
        <div className="home-manifesto__mark">
          <div className="home-manifesto__logo">
            <img src="/brand/monograma-bordo.jpg" alt="Monograma Estudio Bordó" />
          </div>
        </div>
      </div>
    </section>
  );
}
