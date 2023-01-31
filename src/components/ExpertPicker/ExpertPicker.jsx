const getQuestion = (mode) => {
  switch (mode) {
    case "choose-category":
      return "Choose a category";
    case "choose-nonexpert":
      return "Choose who would struggle the most with that";
    default:
      throw new Error(`No question for mode '${mode}'`);
  }
};

function ExpertPicker({ mode, experts, onSelect }) {
  const question = getQuestion(mode);

  return (
    <div>
      <h2>{question}</h2>

      <ul>
        {experts.map(({ name, category }) => (
          <li key={name}>
            <button
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
      </ul>
    </div>
  );
}

export default ExpertPicker;
