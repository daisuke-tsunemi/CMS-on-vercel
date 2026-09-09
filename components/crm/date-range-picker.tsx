"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/crm/ui/button"
import { Calendar } from "@/components/crm/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/crm/ui/popover"

function formatDate(date: Date) {
  return date.toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
}

export function DateRangePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const label = range?.from
    ? range.to
      ? `${formatDate(range.from)} 〜 ${formatDate(range.to)}`
      : formatDate(range.from)
    : "期間を選択"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
          <CalendarIcon data-icon="inline-start" />
          <span className="font-mono text-xs">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
