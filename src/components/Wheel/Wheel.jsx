import { useEffect, useRef, useState } from "react";
import "./Wheel.css";

const MIN_TURNS = 4;
const MAX_TURNS = 6;
const SPIN_DURATION_MS = 10000;

const getRandomAngle = () =>
  Math.random() * (MAX_TURNS - MIN_TURNS) + MIN_TURNS;

const removeExcessFromAngle = (angle) => angle - Math.floor(angle);

const calculateWhichSectorAngleIsIn = (angle, totalSectors) =>
  Math.floor((1 - angle) / (1 / totalSectors));

function Wheel({
  mode,
  experts = [],
  selectedExpert,
  selectedNonexpert,
  onSpinningEnd,
}) {
  const wheelRef = useRef(null);
  const [spinAnimation, setSpinAnimation] = useState();
  const [spinAnimationRunning, setSpinAnimationRunning] = useState(false);
  const [currentExpertWheelStoppedOn, setCurrentExpertWheelStoppedOn] =
    useState(null);

  useEffect(() => {
    if (mode === "choose-category") {
      setCurrentExpertWheelStoppedOn(null);
    }
  }, [mode]);

  const spinWheel = async () => {
    const turn = getRandomAngle();

    if (spinAnimation) {
      if (spinAnimation.playState !== "finished") {
        return;
      }

      spinAnimation.cancel();
    }

    const newSpinAnimation = new Animation(
      new KeyframeEffect(wheelRef.current, [{ rotate: `${turn}turn` }], {
        duration: SPIN_DURATION_MS,
        easing: "ease-out",
        fill: "forwards",
      })
    );

    newSpinAnimation.play();
    setSpinAnimation(newSpinAnimation);
    setSpinAnimationRunning(true);

    try {
      await newSpinAnimation.finished;

      setSpinAnimationRunning(false);

      const angleAfterSpin = removeExcessFromAngle(turn);
      const expertWheelStoppedOn = calculateWhichSectorAngleIsIn(
        angleAfterSpin,
        experts.length
      );

      setCurrentExpertWheelStoppedOn(expertWheelStoppedOn);
      onSpinningEnd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wheel-container">
      <div ref={wheelRef} className="wheel">
        {experts.map(({ name }, index) => {
          const halfOfSectorAngle = 1 / experts.length / 2;
          const rotation = index / experts.length;
          const isSelectedExpert = selectedExpert === index;
          const isSelectedNonexpert =
            selectedNonexpert === index &&
            (currentExpertWheelStoppedOn === null ||
              currentExpertWheelStoppedOn === index);
          const isCurrentExpertWheelStoppedOn =
            currentExpertWheelStoppedOn === index;

          return (
            <div
              key={name}
              className={`wheel-segments ${
                isCurrentExpertWheelStoppedOn ? "selected" : ""
              } ${isSelectedExpert ? "expert" : ""} ${
                isSelectedNonexpert ? "nonexpert" : ""
              }`}
              style={{ rotate: `${halfOfSectorAngle + rotation}turn` }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div
        className="wheel-pointer"
        hidden={mode !== "spin" && mode !== "question"}
      />
      <button
        type="button"
        className="spin-button"
        disabled={mode !== "spin" || spinAnimationRunning}
        onClick={spinWheel}
      >
        Spin
      </button>
    </div>
  );
}

export default Wheel;
