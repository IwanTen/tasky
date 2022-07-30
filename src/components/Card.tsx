import { IoMdClose as CloseIcon } from "react-icons/io";

interface stepData {
  step: string;
  completed?: Boolean;
}

type Props = {
  id: string;
  title: string;
  info: string;
  steps: [stepData];
  deleteTask: (id: string) => any;
};

const Card: React.FC<Props> = (Props) => {
  const deleteCard = () => {
    Props.deleteTask(Props.id);
  };

  const Steps = Props.steps.map((step, index) => {
    return (
      <div className="card__step" key={index}>
        <div className="card__step__number">{index + 1}</div>
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
      <p className="card__info">{Props.info}</p>
      {Steps}
    </div>
  );
};

export default Card;
