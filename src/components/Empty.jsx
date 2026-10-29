export default function Empty({ title, sub = '', action = null }) {
  return (
    <div className="empty">
      <div className="icon">🗂️</div>
      <h3>{title}</h3>
      {sub && <p>{sub}</p>}
      {action}
    </div>
  );
}