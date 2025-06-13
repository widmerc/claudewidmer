import { parseISO, format } from "date-fns";
import { de } from "date-fns/locale";


const DateFormatter = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "d. LLLL yyyy", { locale: de })}
    </time>
  );
};

export default DateFormatter;
