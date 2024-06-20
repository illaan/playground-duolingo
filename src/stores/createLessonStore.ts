import { units } from "@/utils/units";
import type { BoundStateCreator } from "@/hooks/useBoundStore";

export type LessonSlice = {
  lessonsCompleted: number;
  increaseLessonsCompleted: (by?: number) => void;
  jumpToUnit: (unitNumber: number) => void;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set) => ({
  lessonsCompleted: 0,
  increaseLessonsCompleted: (by = 1) =>
    set((prevState: LessonSlice) => ({
      lessonsCompleted: prevState.lessonsCompleted + by,
    })),
  jumpToUnit: (unitNumber: number) =>
    set((prevState: LessonSlice) => {
      const lessonsPerTile = 4;
      const totalLessonsToJumpToUnit = units
        .filter((unit) => unit.unitNumber < unitNumber)
        .map((unit) => unit.tiles.length * lessonsPerTile)
        .reduce((a, b) => a + b, 0);
      return {
        lessonsCompleted: Math.max(prevState.lessonsCompleted, totalLessonsToJumpToUnit),
      };
    }),
});
