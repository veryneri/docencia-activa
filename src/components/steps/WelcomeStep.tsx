// Componente del paso inicial
import type { ICommonStepProps } from './types';

type IWelcomeStepProps = Pick<ICommonStepProps, 'step' | 'setStep'>;

const WelcomeStep = ({ step, setStep }: IWelcomeStepProps) => (
  <div className="text-center p-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">¡Hola!</h2>
    <p className="text-gray-700 mb-6">
      Este es un test para que tu maestro te conozca mejor y pueda ayudarte a aprender de la mejor
      manera. ¡Es divertido y muy fácil!
    </p>
    <button
      onClick={() => setStep(step + 1)}
      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-colors">
      Empezar
    </button>
  </div>
);

export default WelcomeStep;
