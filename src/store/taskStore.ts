import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Definición del tipo de dato para las tareas (incluyendo _id de MongoDB)
export type task = {
  _id?: string;
  name: string;
  description: string;
  duedate: string;
}

type TaskState = {
  tasks: task[];
  setTasks: (tasks: task[]) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>()(
  devtools((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }, false, 'setTasks'),
    
    // Obtiene las tareas desde el backend
    fetchTasks: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/getTasks`, {
          headers: { 'Authorization': '123456' } // Llave de seguridad requerida por el backend
        });
        const data = await res.json();
        set({ tasks: data }); // Actualiza el estado con los datos de MongoDB
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    },

    // Envía una nueva tarea al servidor
    addTask: async (task) => {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/addTask`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': '123456' 
        },
        body: JSON.stringify(task)
      });
      // Refrescamos la lista completa tras la inserción
      useTaskStore.getState().fetchTasks(); 
    },

    // Elimina una tarea mediante su _id de MongoDB
    removeTask: async (id) => {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/removeTask/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': '123456' }
      });
      useTaskStore.getState().fetchTasks(); 
    }
  }))
);