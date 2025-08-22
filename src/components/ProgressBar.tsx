// Componente de la barra de progreso
interface IProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: IProgressBarProps) => {
  const progress = total ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
