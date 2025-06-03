import { createContext } from "react";

export const HabitContext = createContext({
    habitList: [],
    input: ""
})