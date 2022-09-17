import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface IOptions {
  weekDays: string[];
  index: string;
  day: string;
}

export const Options = ({ weekDays, day, index }: IOptions) => {
  return (
    <ToggleGroup.Item
      value={index}
      className={`w-8 h-8 rounded  ${
        weekDays?.includes(index) ? "bg-violet-500" : "bg-zinc-900"
      } `}
      title="Domingo"
    >
      {day}
    </ToggleGroup.Item>
  );
};
