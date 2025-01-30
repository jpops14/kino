'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const DateFilter = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter();

    const dateParam = searchParams.get('date');

    const date = dateParam ? dayjs(dateParam) : dayjs().startOf('day');

    const updateFilter = (date: Dayjs | null) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("date", (date || dayjs()).format('YYYY-MM-DD'));
        router.push(`${pathname}?${updatedParams.toString()}`);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                sx={{ m: 0, p: 0, }}
                showDaysOutsideCurrentMonth
                    value={date}
                    onChange={(value) => {
                        updateFilter(value);
                    }}
                    disablePast
            />
        </LocalizationProvider>
    )
}

export default DateFilter;

