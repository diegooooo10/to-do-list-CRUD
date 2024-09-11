export const TareaReducer = (state, action) => {
  switch (action.type) {
    case "agregar":
      return [...state, action.payload];

    case "eliminar":
      return state.filter((tarea) => tarea.id !== action.payload);

    case "modificar":
      return state.map((tarea) =>
        tarea.id === action.payload.id
          ? { ...tarea, texto: action.payload.texto }
          : tarea
      );

    case "marcar":
      return state.map((tarea) =>
        tarea.id === action.payload
          ? { ...tarea, completado: !tarea.completado }
          : tarea
      );

    default:
      return state;
  }
};
