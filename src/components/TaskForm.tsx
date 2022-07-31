import { useEffect, useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { MdAdd as AddStepIcon } from "react-icons/md";
import { MdClear as ClearStepIcon } from "react-icons/md";

const formDefaults = {
  name: "add a task here",
  info: "add a description (optional)",
};
type Props = {
  createTask: (data: any) => void;
  formOpen: Boolean;
  closeForm: () => void;
};

interface stepData {
  step: string;
  completed: Boolean;
}

interface taskData {
  name: string;
  info: string;
  steps: stepData[];
}

const Create: React.FC<Props> = (Props) => {
  const [data, setData] = useState<taskData>({
    name: "",
    info: "",
    steps: [],
  });

  const [formError, setFormError] = useState({
    name: false,
    info: false,
    steps: false,
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!handleErrors()) {
      Props.createTask(data);
      resetForm();
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      info: "",
      steps: [],
    });
  };

  const handleErrors = () => {
    if (data.name.length < 1) {
      setFormError((prev) => {
        return {
          ...prev,
          name: true,
        };
      });
      return true;
    }
    return false;
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormError((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const handleStepChange = (e: any, index: number) => {
    const { value } = e.target;
    setData((data) => {
      return {
        ...data,
        steps: data.steps.map((step, idx) => {
          if (index == idx) return { step: value, completed: false };
          else return step;
        }),
      };
    });
  };

  const addStep = () => {
    setData((prev) => {
      return {
        ...prev,
        steps: [...prev.steps, { step: "", completed: false }],
      };
    });
  };

  const removeStep = (index: number) => {
    setData((prev) => {
      return {
        ...prev,
        steps: prev.steps.filter((v, idx) => {
          return idx !== index;
        }),
      };
    });
  };

  const StepInputs =
    data.steps.length > 0
      ? data.steps.map((step, index) => {
          return (
            <div className="task-form__step-wrapper" key={`step${index}`}>
              <input
                className="task-form__input"
                name="steps"
                id={`step${index + 1}`}
                placeholder={`what is step ${index + 1}?`}
                type="text"
                value={String(data.steps[index].step)}
                onChange={(event) => handleStepChange(event, index)}
              />
              <ClearStepIcon
                className="task-form__clear-step"
                onClick={() => removeStep(index)}
              />
            </div>
          );
        })
      : null;

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div
      className={`task-form ${
        Props.formOpen == true ? "task-form--active" : "task-form--hidden"
      }`}
    >
      <div className="task-form__header">
        <h2 className="task-form__header__title">{"create a new task"}</h2>
        {/* <CloseIcon className="task-form__close" onClick={Props.closeForm} /> */}
      </div>
      <form className="task-form__form" onSubmit={handleSubmit}>
        <label htmlFor="task-name" className="task-form__label">
          {"Task Name"}
        </label>
        <input
          className="task-form__input"
          name="name"
          id="task-name"
          placeholder="what do you need to do?"
          type="text"
          value={data.name}
          onChange={handleChange}
        />
        {formError.name && (
          <div className="task-form__error">
            {"you must provide a task name!"}
          </div>
        )}
        <label htmlFor="task-info" className="task-form__label">
          {"description"}
        </label>
        <textarea
          className="task-form__input"
          name="info"
          id="task-info"
          placeholder="add more details (optional)"
          value={data.info}
          onChange={handleChange}
        ></textarea>
        {StepInputs}
        <div className="task-form__add-step" onClick={addStep}>
          {"add step"}
          <AddStepIcon />
        </div>
        <div className="task-form__buttons">
          <button
            className="task-form__button task-form__button--cancel"
            onClick={() => Props.closeForm()}
          >
            {"cancel"}
          </button>
          <button className="task-form__button task-form__button--submit">
            {"add task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;

// ${collapsed ? "collapsed" : ""} code to collapse card
