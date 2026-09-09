import { cn } from "@/lib/crm/utils"
import { STAGE_LABELS, type DealStage } from "@/lib/crm/data"

const stageStyles: Record<DealStage, string> = {
  lead: "bg-secondary text-secondary-foreground",
  qualified: "bg-chart-4/15 text-chart-4",
  proposal: "bg-primary/15 text-primary",
  negotiation: "bg-warning/15 text-warning",
  closed_won: "bg-success/15 text-success",
  closed_lost: "bg-destructive/15 text-destructive",
}

export function StageBadge({ stage, className }: { stage: DealStage; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        stageStyles[stage],
        className
      )}
    >
      {STAGE_LABELS[stage]}
    </span>
  )
}
