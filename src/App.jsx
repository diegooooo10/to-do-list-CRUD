import { useState } from "react";
import { AgregarTarea } from "./components/AgregarTarea";

export const App = () => {
  const [tarea, setTarea] = useState("");

  const handleInputChange = (e) => {
    setTarea(e.target.value);
  };

  return (
    <>
      <div className="rounded-xl block bg-white max-w-[800px] mx-auto h-auto p-5 gap-3">
        <h1 className="m-3 text-3xl font-bold text-center text-black">Lista de Tareas</h1>
        <input
          autoFocus
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ring-blue-500 items-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          type="text"
          maxLength={100}
          placeholder="Agrega una tarea"
          value={tarea}
          onChange={handleInputChange}
        />

        <AgregarTarea tarea={tarea} setTarea={setTarea}  />
      </div>
    </>
  );
};
