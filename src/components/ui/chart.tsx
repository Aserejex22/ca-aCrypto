import * as React from "react";
import * as RechartsPrimitive from "recharts";

// Simple chart utilities for CO2 platform
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs",
            className
          )}
          {...props}
        >
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

// Simple tooltip component
interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, label, className, ...props }, ref) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-white/10 backdrop-blur-lg p-2 shadow-md",
          className
        )}
        {...props}
      >
        {label && (
          <div className="mb-2 font-medium text-white">
            {label}
          </div>
        )}
        <div className="grid gap-2">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-green-200">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = ChartTooltip;

// Simple legend component  
interface ChartLegendProps {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  nameKey?: string;
  className?: string;
}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ payload, verticalAlign = "bottom", className, ...props }, ref) => {
    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" && "pb-3",
          verticalAlign === "bottom" && "pt-3",
          className
        )}
        {...props}
      >
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-green-200 text-sm">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
);
ChartLegend.displayName = "ChartLegend";

const ChartLegendContent = ChartLegend;

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
};