import { useState, useEffect } from "react";
import Card from "../components/Card";
import TaskForm from "../components/TaskForm";
import { MdAdd as AddTaskButton } from "react-icons/md";
import idb, { openDB, DBSchema } from "idb";
import "../styles/style.css";

type Props = {};

interface stepData {
  step: string;
  completed?: Boolean;
}

interface taskData {
  name: string;
  info: string;
  steps: stepData[];
}

const apiUrl = "/api/v1/tasks";

const App = (props: Props) => {
  const storeName = "TaskStore";
  const [taskData, setTaskData] = useState<any[]>([]);
  const [formIsOpen, setFormIsOpen] = useState<Boolean>(true);

  // useEffect(() => {
  //   console.log("taskData", taskData);
  // }, [taskData]);

  useEffect(() => {
    if (!window.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );
    } else {
      initIndexDb();
    }
  }, []);

  const initIndexDb = async () => {
    try {
      let db = await openDB(storeName, 3, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      let allTasks = await db.getAll("tasks");
      setTaskData(allTasks);
    } catch (err) {
      console.log("error initializing database", err);
      setTaskData([]);
    }
  };

  const addTaskToIndexDb = async (data: taskData) => {
    try {
      let db = await openDB(storeName, 3, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      await db.add("tasks", data);
      await initIndexDb();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTaskFromIndexDb = async (id: number) => {
    let db = await openDB(storeName, 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        }
      },
    });

    await db.delete("tasks", id);
    initIndexDb();
  };

  const updateTaskInIndexDb = async (id: number, idx: number) => {
    let item = taskData.find((task) => task.id == id);
    console.log("item", item);

    let step = item.steps.map((step: stepData, index: number) => {
      if (index == idx) step.completed = !step.completed;
      return step;
    });
    console.log("step ", step);
    const updatedItem = { ...item, steps: step };

    try {
      let db = await openDB(storeName, 3, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      await db.put("tasks", updatedItem);
      await initIndexDb();
    } catch (error) {
      console.log(error);
    }
  };

  let Cards;
  if (taskData) {
    Cards = taskData.map((task) => {
      return (
        <Card
          title={task.name}
          info={task.info}
          steps={task.steps}
          id={task.id}
          key={task.id}
          deleteTask={deleteTaskFromIndexDb}
          updateStep={updateTaskInIndexDb}
        />
      );
    });
  }

  return (
    <div className="project-page">
      <div className="project-page__header">
        <h1 className="project-page__header__title">{"MY TASKS"}</h1>
        {/* <h2 className="project-page__header__form-button">set timer</h2> */}
      </div>
      <div className="project-page__divider">
        {"tasks"}
        <AddTaskButton
          size={"auto"}
          className="project-page__add-button"
          onClick={() => setFormIsOpen(true)}
        />
      </div>
      <div className="project-page__content">
        <TaskForm
          formOpen={formIsOpen}
          createTask={addTaskToIndexDb}
          closeForm={() => {
            setFormIsOpen(false);
          }}
        />
        <div className="cards">{Cards}</div>
      </div>
    </div>
  );
};

export default App;

// const clearAllIndexDbTasks = async () => {
//   let db = await openDB(storeName, 3, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains("tasks")) {
//         db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
//       }
//     },
//   });
//   await db.clear("tasks");
// };
