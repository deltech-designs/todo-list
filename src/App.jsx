import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

export default function App() {
  // const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);

  function handleAddTask(item) {
    setItems((items) => [...items, item]);
  }

  function handleDoneTask(id) {
    // setItems(
    //   items.map((item) =>
    //     item.id === id ? { ...item, checked: !item.checked } : item
    //   )
    // );

    // Completed Task
    const selectTask = items?.find((item) => item.id === id);
    if (selectTask)
      setcompletedTasks([...completedTasks, { ...selectTask, checked: true }]);
    setItems((items) => items.filter((item) => item.id !== id));

    
    // if (selectTask.checked) {
    //   // setItems((its) => its.filter((item) => item.id !== id));
    // } else {
    //   // setcompletedTasks(completedTasks.filter((item) => item.id !== id));
    // }
  }

  function handleDeleteTask(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="bg-deeppurple text-lightpurple w-full h-screen flex flex-col justify-center items-center">
        <div className="w-2/5 h-auto border-2 border-lightpurple p-3">
          <AddTask onAddTask={handleAddTask} />
          <List
            items={items}
            onTaskDone={handleDoneTask}
            onDeleteTask={handleDeleteTask}
          />

          <CompleteTask onCompeletTask={completedTasks} />
        </div>
      </div>
    </>
  );
}

function AddTask({ onAddTask }) {
  const [description, setDescription] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!description) return;

    const newList = { description, done: false, id: Date.now() };
    console.log(newList);
    onAddTask(newList);

    // console.log(onAddTask(newList));
    setDescription("");
  }

  // console.log(input);

  return (
    <form className="flex items-center gap-4 mb-12" onSubmit={handleSubmit}>
      <input
        type="text"
        className="outline-none p-2 w-full rounded-md"
        placeholder="Add a new task..."
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <button
        type="submit"
        className="bg-lightpurple p-4 rounded-md text-white"
      >
        <FaPlus />
      </button>
    </form>
  );
}

function List({ items, onTaskDone, onDeleteTask }) {
  const numTask = items.length;

  return (
    <ul>
      <h3 className="mb-3 font-semibold text-white text-lg">
        Task to do - {numTask}
      </h3>
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onTaskDone={onTaskDone}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

function Item({ item, onTaskDone, onDeleteTask }) {
  return (
    <li className="flex justify-between items-center mb-6 bg-darkpurple p-3 rounded-md">
      <span>{item.description}</span>
      <div className="flex justify-between items-center  gap-5">
        <IoMdCheckmark size={20} onClick={() => onTaskDone(item.id)} />
        <MdDeleteOutline size={20} onClick={() => onDeleteTask(item.id)} />
      </div>
    </li>
  );
}

function CompleteTask({ onCompeletTask }) {
  const numCompletedTask = onCompeletTask.length;
  return (
    <div className="">
      <h3 className="mb-3 font-semibold text-white text-lg text-left">
        Done Task - {numCompletedTask}
      </h3>
      <div>
        <ul>
          {onCompeletTask.map((item) => (
            <li
              key={item.id}
              className={`mb-6 bg-darkpurple p-3 rounded-md ${
                item.checked ? "line-through" : ""
              }`}
            >
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
