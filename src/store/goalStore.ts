import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type goal = {
  _id?: string;
  name: string;
  description: string;
  duedate: string;
}

type GoalState = {
  goals: goal[];
  setGoals: (goals: goal[]) => void;
  fetchGoals: () => Promise<void>;
  addGoal: (goal: goal) => Promise<void>;
  removeGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>()(
  devtools((set) => ({
    goals: [],
    setGoals: (goals) => set({ goals }, false, 'setGoals'),
    
    // Conexión para obtener metas
    fetchGoals: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/goals/getGoals`, {
        headers: { 'Authorization': '123456' }
      });
      const data = await res.json();
      set({ goals: data });
    },

    // Conexión para crear meta
    addGoal: async (goal) => {
      await fetch(`${import.meta.env.VITE_API_URL}/goals/addGoal`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': '123456' 
        },
        body: JSON.stringify(goal)
      });
      useGoalStore.getState().fetchGoals();
    },

    // Conexión para eliminar meta
    removeGoal: async (id) => {
      await fetch(`${import.meta.env.VITE_API_URL}/goals/removeGoal/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': '123456' }
      });
      useGoalStore.getState().fetchGoals();
    }
  }))
);