import { formatScore, joinClasses } from "../../utils/helpers";
import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon: Icon,
  accent = "purple",
  meta,
}) => {
  return (
    <article className="stat-card">
      <div className="stat-card-header">
        {Icon && (
          <span className={joinClasses("stat-card-icon", `stat-card-icon-${accent}`)}>
            <Icon aria-hidden="true" />
          </span>
        )}
      </div>
      <p>{title}</p>
      <strong>{formatScore(value)}</strong>
      {meta && <span className="stat-card-meta">{meta}</span>}
    </article>
  );
};

export default StatCard;
