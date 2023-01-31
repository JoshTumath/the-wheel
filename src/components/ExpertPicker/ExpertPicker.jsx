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

function ExpertPicker({ mode, experts, selectedExpert = null, onSelect }) {
  const question = getQuestion(mode);
  console.log(selectedExpert);

  return (
    <div>
      <h2>{question}</h2>

      <ul role="list" className="stack">
        {experts.map(({ name, category }, index) => (
          <li key={name}>
            <button
              type="button"
              disabled={index === selectedExpert}
              className="button"
              onClick={() => {
                onSelect(index);
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
