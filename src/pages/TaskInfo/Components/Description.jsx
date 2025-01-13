export default function Description({description}) {
    return (
        <div className="task-description">
          <h2>Description</h2>
          <textarea className="description-input">{description}</textarea>
        </div>
    );
}