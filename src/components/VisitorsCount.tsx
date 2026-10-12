
import { formatIndianCount, getLabel } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getVisitorsCount } from "@/actions/visitorsActions";

const VisitorsCount = async () => {
  const count = await getVisitorsCount()

  const displayCount = count === null ? "—" : formatIndianCount(count);
  const countLabel = count === null ? "Visitors count unavailable" : `${count} ${getLabel(count)}`;

  return (
    <span className="text-xs px-2 py-1 w-full text-start font-medium text-muted-foreground flex items-center gap-4">
      Visitors
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <span className="text-primary font-bold text-xl">{displayCount}</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{countLabel}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default VisitorsCount;
