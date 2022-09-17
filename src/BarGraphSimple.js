import { useEffect, useRef } from "react";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";

const margin = { top: 10, right: 10, bottom: 50, left: 50 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const CreateAxis = ({ axisDirection, scale, transform }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisDirection(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

const CreateBars = ({ data, height, scaleX, scaleY }) => {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={label}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="white"
        />
      ))}
    </>
  );
};

const BarGraphSimple = ({ data }) => {
  const data_labels = data.map(({ label }) => label);
  const data_values = data.map(({ value }) => value);
  const data_value_max = Math.max(...data_values);

  const scaleX = scaleBand().domain(data_labels).range([0, width]);
  const scaleY = scaleLinear().domain([0, data_value_max]).range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <CreateAxis
          axisDirection={axisBottom}
          scale={scaleX}
          transform={`translate(0, ${height})`}
        />
        <CreateAxis axisDirection={axisLeft} scale={scaleY} />

        <CreateBars
          data={data}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </g>
    </svg>
  );
};

export default BarGraphSimple;
