import { familia } from "@/lib/fonts";

const SECTIONS = [
  { href: "#projects", label: "Projects" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className={`site-footer ${familia.className}`}>
      <div className="site-footer__dots" aria-hidden="true" />
      <div className="site-footer__grid">
        <div className="site-footer__studio">
          <p className="site-footer__name">Estudio Bordó</p>
          <p className="site-footer__blurb">
            Ejemplo. Bla bla bla. Estudio de arquitectura e interiorismo.
            Texto de prueba para el pie de página.
          </p>
        </div>
        <div>
          <p className="site-footer__label">Secciones</p>
          <ul className="site-footer__list">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <a href={section.href}>{section.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer__label">Contacto</p>
          <ul className="site-footer__list">
            <li>
              <a href="mailto:hola@estudiobordo.example">hola@estudiobordo.example</a>
            </li>
            <li>
              <a href="tel:+541100000000">+54 11 0000 0000</a>
            </li>
            <li>Buenos Aires, ejemplo</li>
          </ul>
        </div>
      </div>
      <p className="site-footer__note">Ejemplo · 2026</p>
    </footer>
  );
}
