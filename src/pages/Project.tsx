import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import TaskForm from "../components/TaskForm";
import { IoAdd as AddTaskButton } from "react-icons/io5";
import "../styles/style.css";

type Props = {};

interface stepData {
  step: string;
  completed?: Boolean;
}

interface taskData {
  // id: number;
  name: string;
  info: string;
  steps: stepData[];
}

const apiUrl = "/api/v1/tasks";

let db: any;

const App = (props: Props) => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [formIsOpen, setFormIsOpen] = useState<Boolean>(true);
  // const [idxDb, setidxDb] = useState<any>(null);

  let dummyTask: taskData = {
    // id: 1,
    name: "test task",
    info: "test info",
    steps: [
      { step: "test step 1", completed: false },
      { step: "test step 1", completed: false },
    ],
  };

  useEffect(() => {
    // fetchAllTasks();
    if (!window.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );
    } else {
      initIndexDb();
    }
  }, []);

  const initIndexDb = () => {
    console.log("open index db function called");
    const openRequest = window.indexedDB.open("testTaskdb", 3);
    let dbRef;
    openRequest.onupgradeneeded = () => {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains("tasks")) {
      }
      db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      console.log("object store created");
    };

    openRequest.onsuccess = function (e: any) {
      if (e.target != null) {
        dbRef = e.target.result;
        console.log(e.target.result);
      }
    };
    openRequest.onerror = function (e: any) {
      console.error("Error", e.target.error);
      dbRef = null;
    };

    return dbRef;
  };

  // const addTaskToIndexDb = () => {
  //   console.log("add indexdb task function called");
  //   let db = initIndexDb;
  //   if (db != null) {
  //     let transaction = db.transaction("tasks", "readwrite");
  //     let tasks = transaction.objectStore("tasks");
  //     let request = tasks.add(dummyTask);
  //     request.onsuccess = function () {
  //       console.log("task added to the store", request);
  //     };
  //     request.onerror = function () {
  //       console.log("Error", request.error);
  //     };
  //   }
  // };

  const setDummyLocalData = () => {};

  // const fetchAllTasksfromIndexDb = () => {
  //   console.log("fetch all idxDb tasks function called");
  //   if (idxDb != null) {
  //     let transaction = idxDb.transaction("tasks", "readwrite");
  //     let tasks = transaction.objectStore("tasks");
  //     let request = tasks.getAll();
  //     request.onsuccess = () => {
  //       setCardData(request.result);
  //     };
  //     request.onerror = (err: any) => {
  //       console.error(`Error to get all students: ${err}`);
  //     };
  //   } else {
  //     console.log("db ref was null");
  //   }
  // };

  let Cards;
  if (cardData) {
    Cards = cardData.map((card) => {
      return (
        <Card
          title={card.name}
          info={card.info}
          steps={card.steps}
          id={card._id}
          key={card._id}
          deleteTask={() => {
            console.log("delete tasks");
          }}
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
        {/**
         * //TODO retrieve test data from localdb then add form and
         * //TODO implement create and delete functions
         */}

        {/* <TaskForm
          formOpen={formIsOpen}
          createTask={createTask}
          closeForm={() => {
            setFormIsOpen(false);
          }}
        /> */}
        <div className="cards">{Cards}</div>
        {/* <button onClick={() => addTaskToIndexDb()}>add task</button> */}
        {/* <button onClick={() => fetchAllTasksfromIndexDb()}>fetch data</button> */}
      </div>
    </div>
  );
};

export default App;

// const createTask = (incomingData: any) => {
//   console.log("create task input data:" + JSON.stringify(incomingData));
//   fetch("/api/v1/tasks", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: incomingData.name,
//       info: incomingData.info,
//       steps: incomingData.steps,
//     }),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         return catchError(res);
//       } else {
//         res.json().then((data) => {
//           console.log(data);
//           setCardData((prev) => {
//             return [...prev, data.task];
//           });
//         });
//       }
//     })
//     .catch(catchError);
// };

// const deleteTask = (id: string) => {
//   fetch(`/api/v1/tasks/${id}`, {
//     method: "delete",
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       setCardData((data) => data.filter((card) => card._id !== id));
//       console.log(`${res.task} successfully deleted!`);
//     })
//     .catch((err) => console.log(err));
// };
