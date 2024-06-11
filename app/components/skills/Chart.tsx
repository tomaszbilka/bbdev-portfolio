type TProps = {
  extraInfo?: string;
  icon: React.ReactNode;
  isVivible: boolean;
  level: number;
  name: string;
};

const Chart = ({ extraInfo, icon, isVivible, level, name }: TProps) => {
  return (
    <>
      <div className="chart-container">
        <div className="chart-container__info">
          {icon}
          <p className="chart-container__name">{name}</p>
        </div>
        <div className="chart-container__chart-outside">
          <div
            className="chart-container__chart-inside"
            style={{ width: `${isVivible ? level : 0}%` }}
          ></div>
        </div>
        {extraInfo && (
          <div className="chart-tooltip">
            <p>{extraInfo}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chart;
