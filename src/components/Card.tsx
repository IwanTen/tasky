import React from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";

interface stepData {
  step: string;
  completed?: Boolean;
}

type Props = {
  id: number;
  title: string;
  info: string;
  steps: [stepData];
  deleteTask: (id: number) => any;
  updateStep: (id: number, idx: number) => any;
};

const Card: React.FC<Props> = (Props) => {
  const deleteCard = () => {
    Props.deleteTask(Props.id);
  };

  const updateStep = (idx: number) => {
    Props.updateStep(Props.id, idx);
  };

  const Steps = Props.steps.map((step, index) => {
    return (
      <div
        className={`card__step ${
          step.completed ? "card__step--completed" : ""
        }`}
        key={index}
      >
        <div className="card__step__number" onClick={() => updateStep(index)}>
          {index + 1}
        </div>
        <p className="card__step__text">{step.step}</p>
      </div>
    );
  });
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__header__title">{Props.title}</h2>

        <CloseIcon className="close-button" onClick={deleteCard} />
      </div>
      {Props.info.length > 0 && <p className="card__info">{Props.info}</p>}
      {Steps}
    </div>
  );
};

export default Card;
