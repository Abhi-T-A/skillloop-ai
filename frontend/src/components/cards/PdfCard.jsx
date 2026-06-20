import { FiFileText } from "react-icons/fi";

function PdfCard({ title, detail, meta, action }) {
  return (
    <article className="resource-card">
      <FiFileText aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        {detail && <p>{detail}</p>}
        {meta && <span>{meta}</span>}
      </div>
      {action}
    </article>
  );
}

export default PdfCard;
