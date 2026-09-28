type Format = "square" | "tall" | "portrait" | "slim" | "wide";

type Cell = {
  format: Format;
  column: string;
  row: string;
};

type Photo = { src: string; alt: string };

const PHOTOS: Record<string, Photo> = {
  bano: { src: "/fotos-home/bano-dentro.jpg", alt: "Baño con espejo y luz natural" },
  marmol: { src: "/fotos-home/marmol.png", alt: "Mármol blanco con vetas bordó" },
  dormitorio: { src: "/fotos-home/dormitorio.png", alt: "Dormitorio con respaldo de esterilla y aplique" },
  m15: { src: "/fotos-home/maria-0015.jpg", alt: "Interior en tono claro" },
  m18: { src: "/fotos-home/maria-0018.jpg", alt: "Interior en formato vertical" },
  m30: { src: "/fotos-home/maria-0030.jpg", alt: "Interior del estudio" },
  m34: { src: "/fotos-home/maria-0034.jpg", alt: "Detalle de interior" },
  m42: { src: "/fotos-home/maria-0042.jpg", alt: "Espacio de interior" },
  m46: { src: "/fotos-home/maria-0046.jpg", alt: "Rincón de interior" },
  tela: { src: "/fotos-home/tela.png", alt: "Persona acomodando una tela blanca en el techo" },
  gancho: { src: "/fotos-home/gancho.jpg", alt: "Detalle de interior con gancho" },
};

const BY_FORMAT: Record<Format, string[]> = {
  wide: ["bano", "m15"],
  tall: ["m18", "gancho"],
  portrait: ["m30"],
  slim: ["marmol", "dormitorio"],
  square: ["tela", "m34", "m42", "m46", "m15", "bano", "m18", "gancho", "marmol", "dormitorio", "m30"],
};

const CELLS: Cell[] = [
  { format: "square", column: "1", row: "1" },
  { format: "square", column: "1", row: "2" },
  { format: "tall", column: "2", row: "1 / span 2" },
  { format: "square", column: "3", row: "1" },
  { format: "square", column: "3", row: "2" },
  { format: "square", column: "4", row: "1" },
  { format: "square", column: "4", row: "2" },
  { format: "slim", column: "5", row: "1 / span 2" },
  { format: "wide", column: "6 / span 2", row: "1" },
  { format: "square", column: "6", row: "2" },
  { format: "square", column: "7", row: "2" },
  { format: "square", column: "8", row: "1" },
  { format: "square", column: "8", row: "2" },
  { format: "portrait", column: "9", row: "1 / span 2" },
  { format: "square", column: "10", row: "1" },
  { format: "square", column: "10", row: "2" },
  { format: "slim", column: "11", row: "1 / span 2" },
  { format: "square", column: "12", row: "1" },
  { format: "square", column: "12", row: "2" },
  { format: "square", column: "13", row: "1" },
  { format: "square", column: "14", row: "1" },
  { format: "wide", column: "13 / span 2", row: "2" },
  { format: "square", column: "15", row: "1" },
  { format: "square", column: "15", row: "2" },
  { format: "tall", column: "16", row: "1 / span 2" },
  { format: "square", column: "17", row: "1" },
  { format: "square", column: "17", row: "2" },
];

export default function HomeMoodboard() {
  const used: Record<Format, number> = { square: 0, tall: 0, portrait: 0, slim: 0, wide: 0 };

  return (
    <section className="moodboard" aria-label="Moodboard de concepto">
      <div className="moodboard__head">
        <div className="moodboard__dots" aria-hidden="true" />
      </div>
      <div className="moodboard__scroller">
        <div className="moodboard__track">
          {CELLS.map((cell, index) => {
            const list = BY_FORMAT[cell.format];
            const photo = PHOTOS[list[used[cell.format] % list.length]];
            used[cell.format] += 1;
            return (
              <div
                className={`moodboard__slot moodboard__slot--${cell.format}`}
                key={index}
                style={{ gridColumn: cell.column, gridRow: cell.row }}
              >
                <img src={photo.src} alt={photo.alt} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
