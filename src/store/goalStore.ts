import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type goal = {
  id: number,
  name: string,
  description: string,
  dueDate: string
}

type GoalState = {
  goals: goal[]
  setGoals: (goals: goal[]) => void
  removeGoal: (goal: goal) => void
  addGoal: (goal: goal) => void
}

export const useGoalStore = create<GoalState>()(
  devtools(
    (set) => ({
      goals: [],
      setGoals: (goals) => set({ goals }, false, 'setGoals'),
      removeGoal: (goal) => set((state) => ({ 
        goals: state.goals.filter((g) => g.id !== goal.id) 
      }), false, 'removeGoal'),
      addGoal: (goal) => set((state) => ({ 
        goals: [...state.goals, goal] 
      }), false, 'addGoal')
    }),
    { name: 'goal-store' }
  )
)