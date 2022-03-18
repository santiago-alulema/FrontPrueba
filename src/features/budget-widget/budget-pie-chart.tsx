import { budgetColors } from "@constants";
import React, { MouseEvent } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { GetBudgetDto } from "types/dtos";

export type BudgetPieChartProps = {
  pieData: GetBudgetDto[];
};

export const BudgetPieChart = ({ pieData }: BudgetPieChartProps) => {

  const handleMouseOver = (e: MouseEvent<SVGElement>) => {
    console.log(e)
  }

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie data={pieData} dataKey="value">
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={budgetColors[index]} onMouseOver={handleMouseOver} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
