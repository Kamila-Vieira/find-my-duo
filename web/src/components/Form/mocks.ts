type DayChar = "D" | "S" | "T" | "Q" | "S";
type DayName = "Domingo" | "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado";

interface DayOfWeekProps {
  char: DayChar;
  title: DayName;
}

export const daysOfWeek: DayOfWeekProps[] = [
  {
    char: "D",
    title: "Domingo",
  },
  {
    char: "S",
    title: "Segunda",
  },
  {
    char: "T",
    title: "Terça",
  },
  {
    char: "Q",
    title: "Quarta",
  },
  {
    char: "Q",
    title: "Quinta",
  },
  {
    char: "S",
    title: "Sexta",
  },
  {
    char: "S",
    title: "Sábado",
  },
];
