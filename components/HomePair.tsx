import { familia } from "@/lib/fonts";

const PROJECTS = [
  {
    src: "/fotos-home/maria-0015.jpg",
    alt: "Interior de estar con luz natural",
    title: "Texto de prueba",
    subtitle: "Subtítulo de prueba",
    text: "Texto de prueba para esta imagen. Acá va una línea corta que describe el proyecto.",
    framed: false,
  },
  {
    src: "/fotos-home/dormitorio.png",
    alt: "Dormitorio con respaldo de esterilla y aplique",
    title: "Texto de prueba",
    subtitle: "Subtítulo de prueba",
    text: "Texto de prueba para esta imagen. Acá va una línea corta que describe el proyecto.",
    framed: true,
  },
];

export default function HomePair() {
  return (
    <section className="home-pair" aria-label="Proyectos">
      {PROJECTS.map((project) => (
        <article
          className={project.framed ? "home-pair__item home-pair__item--framed" : "home-pair__item"}
          key={project.src}
        >
          <div className="home-pair__media">
            {project.framed ? (
              <>
                <span className="home-pair__dots home-pair__dots--top" aria-hidden="true" />
                <span className="home-pair__dots home-pair__dots--side" aria-hidden="true" />
              </>
            ) : null}
            <img src={project.src} alt={project.alt} />
          </div>
          <div className="home-pair__copy">
            <h2 className={`home-pair__title ${familia.className}`}>{project.title}</h2>
            <p className={`home-pair__subtitle ${familia.className}`}>{project.subtitle}</p>
            <p className={`home-pair__text ${familia.className}`}>{project.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
