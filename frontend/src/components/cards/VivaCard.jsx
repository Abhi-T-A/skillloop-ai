import { FiMic } from "react-icons/fi";

function VivaCard({ title, detail, meta }) {
  return (
    <article className="resource-card">
      <FiMic aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        {detail && <p>{detail}</p>}
        {meta && <span>{meta}</span>}
      </div>
    </article>
  );
}

export default VivaCard;
