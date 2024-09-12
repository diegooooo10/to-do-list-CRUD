import { useEffect, useReducer, useState } from "react";
import { TareaReducer } from "../helpers/TareaReducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AgregarTarea = ({ tarea, setTarea, }) => {
  const initialState = JSON.parse(localStorage.getItem("tareas")) || [];
  const [tareas, dispatch] = useReducer(TareaReducer, initialState);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);


  

  const handleAgregarTarea = () => {
    
    if (tarea.trim() !== "") {
      const nuevaTarea = {
        id: Date.now(),
        texto: tarea,
        completado: false,
      };
      dispatch({
        type: "agregar",
        payload: nuevaTarea,
      });
    } else {
      MySwal.fire({
        title: "No se agregó ninguna tarea",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          container: "rounded-xl",
          text: "text-2xl",
          confirmButton: "bg-blue-600 ",
        },
      });
    }
    setTarea("");
  };

  const handleEliminar = (id) => {
    MySwal.fire({
      title: "¿Deseas eliminar la tarea?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
      customClass: {
        confirmButton: "bg-red-700 hover:none text-white",
        denyButton: "bg-white hover:none text-black",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "eliminar", payload: id });
      }
    });
  };

  const handleCheckboxChange = (id) => {
    console.log("Handling checkbox change for id:", id);
    dispatch({ type: "marcar", payload: id });
  };
  
  const handleEditarTarea = (id, texto) => {
    setIsEditing(id);
    setEditText(texto);
  };

  const handleGuardarTarea = (id) => {
    if (editText.trim() === "") {
      dispatch({
        type: "eliminar",
        payload: id,
      });
    } else {
      dispatch({
        type: "modificar",
        payload: { id, texto: editText },
      });
    }
    setIsEditing(null);
  };

  return (
    <>
      <button
        className="flex justify-center p-3 m-3 mx-auto text-white bg-blue-600 rounded-lg lg:w-1/4 hover:bg-blue-700 md:w-1/2 active:scale-95 active:transition-all active:ease-in-out active:duration-150"
        onClick={handleAgregarTarea}
      >
        Agregar Tarea
      </button>

      {tareas.map((tarea) => (
        <div 
          key={tarea.id}
          className={`flex items-center justify-start max-w-full p-4 break-words border border-gray-300 rounded-lg shadow-md gap-4 mt-3 ${
            tarea.completado ? "transition-colors duration-700 ease-in-out bg-gray-100" : "bg-white"
          }`}
        >
          <input
            type="checkbox"
            checked={tarea.completado}
            onChange={() => handleCheckboxChange(tarea.id)}
            className="w-5 h-5 mr-4 text-blue-600 rounded focus:ring-blue-500"
          />
          {isEditing === tarea.id ? (
            <input
              autoFocus
              type="text"
              value={editText}
              maxLength={100}
              onChange={(e) => setEditText(e.target.value)}
              className={`flex-1 p-2 py-2 text-lg  border-0 border-b-2 border-gray-300 outline-none focus:border-blue-500 ${
                tarea.completado
                  ? " transition-colors duration-700 ease-in-out bg-gray-100"
                  : "bg-white"
              }`}
            />
          ) : (
            <label
              className={`flex-1 text-lg text-gray-800 break-words ${
                tarea.completado ? "line-through" : "no-underline"
              }`}
            >
              {tarea.texto}
            </label>
          )}
          <div className="flex space-x-2">
            {isEditing === tarea.id ? (
              <button
                className="p-2 text-green-700 transition duration-150 ease-in-out rounded-full hover:bg-gray-100"
                onClick={() => handleGuardarTarea(tarea.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=" icon icon-tabler icons-tabler-outline icon-tabler-check rotate-animation"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </button>
            ) : (
              <button
                className="p-2 text-blue-700 transition duration-150 ease-in-out rounded-full hover:bg-gray-100"
                onClick={() => handleEditarTarea(tarea.id, tarea.texto)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=" icon-tabler icons-tabler-outline icon-tabler-pencil"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
              </button>
            )}
            <button
              className="p-2 text-red-700 transition duration-150 ease-in-out rounded-full hover:bg-gray-100"
              onClick={() => handleEliminar(tarea.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
