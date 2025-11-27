import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Hook untuk dispatch actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook untuk access state
export const useAppSelector = useSelector.withTypes<RootState>();
