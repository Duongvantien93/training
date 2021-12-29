import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
} from "victory";

export default function VictoryChart2({ data }: any) {
  const label = data.map((item: any) => item.x);
  return (
    <div className="chart-ui">
      <VictoryChart theme={VictoryTheme.material} width={300} height={300}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.material} width={300} height={300}>
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          alignment="start"
          data={data}
        />
      </VictoryChart>
      <VictoryChart domainPadding={20} width={300} height={300}>
        <VictoryAxis tickValues={label} tickFormat={label} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryBar data={data} x="x" y="y" />
      </VictoryChart>
    </div>
  );
}
