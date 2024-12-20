"use client"

import Button from "@/app/components/Button";
import { add, eachDayOfInterval, endOfMonth, format, getDay, isDate, isEqual, isSameMonth, isToday, isValid, parse, startOfToday } from "date-fns";
import { useState } from "react"
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface MenuCalendarProps {
    defaultValue?: Date,
    dispatch: (payload: FormData) => void
    handlerOnSubmit: () => void
}
const MenuCalendar: React.FC<MenuCalendarProps> = ({ dispatch, handlerOnSubmit, defaultValue }) => {

    let today = defaultValue ? new Date(defaultValue) : startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMoth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
    const [inputDate, setInputDate] = useState(format(selectedDay, 'dd-MM-yyyy'))
    let firstDayCurrentMonth = parse(currentMoth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth)
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }


    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex " >
                <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, 'MMM-yyyy')}
                </h2>
                <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <MdOutlineArrowBackIosNew className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                    type="button"
                    onClick={nextMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <MdArrowForwardIos className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500 ">
                <div className="h-8 w-8 mx-auto">D</div>
                <div>S</div>
                <div>T</div>
                <div>Q</div>
                <div>Q</div>
                <div>F</div>
                <div>S</div>
            </div>
            <div className="grid grid-cols-7">
                {days.map((day, dayIdx) => (
                    <div
                        key={dayIdx}
                        className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            'py-1.5'
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setInputDate(format(day, 'dd-MM-yyyy'))
                                setSelectedDay(day)
                            }}
                            className={classNames(
                                isEqual(day, selectedDay) && 'text-white',
                                !isEqual(day, selectedDay) &&
                                isToday(day) &&
                                'text-red-500',
                                !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-900',
                                !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                !isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-400',
                                isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                'bg-gray-900',
                                !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                (isEqual(day, selectedDay) || isToday(day)) &&
                                'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}
                        >
                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                            </time>
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <input type="text" value={inputDate} onChange={(e) => {
                    const dateString = e.currentTarget.value;
                    setInputDate(dateString)
                    const dateInput = parse(dateString, 'dd-MM-yyyy', new Date())
                    if (isValid(dateInput)) {
                        setCurrentMonth(format(dateInput, 'MMM-yyyy'))
                        setSelectedDay(dateInput)
                    }
                }
                } />

                <form action={dispatch}>

                    <input type="hidden" name="due_date" value={selectedDay.toISOString()} />

                    <Button
                        type="submit"
                        label="salvar"
                        onClick={(e) => {
                            console.log(selectedDay)
                            handlerOnSubmit()
                        }}
                        small
                    />
                </form>
            </div>
        </div>
    );
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

export default MenuCalendar;