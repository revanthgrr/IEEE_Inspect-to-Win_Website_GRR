export default function CluePanel({ type, hints }) {
  if (type === "blinking") {
    return (
      <div className="clue blinking">
        <h3 className="panel-label">Hints</h3>
        <div>
          A B C D E P A U S E J S F G H
        </div>
      </div>
    );
  }

  if (type === "image-alt") {
    return (
      <div className="clue">
        <h3 className="panel-label">Hints</h3>
        <img src="/broken.png" alt="ALT_TEXT" style={{ maxWidth: "100%", display: "block", margin: "0 auto" }} />
      </div>
    );
  }

  return (
    <div className="clue">
      <h3 className="panel-label">Hints</h3>
      <div>
        {hints?.primary || "Use your tools wisely."}
      </div>
    </div>
  );
}
