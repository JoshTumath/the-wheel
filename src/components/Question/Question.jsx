function ExpertPicker({ expert, onDone }) {
  return (
    <div>
      <h2>{expert.name}</h2>

      <button
        className="button"
        onClick={() => {
          onDone();
        }}
      >
        Done
      </button>
      {/* <ul>
        {experts.map(({ name, category }) => (
          <li key={name}>
            <button
              className="button"
              onClick={() => {
                onSelect(name);
              }}
            >
              {mode === "choose-category" ? (
                <>
                  {category}
                  <br />
                  <small>{name}</small>
                </>
              ) : (
                name
              )}
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ExpertPicker;
