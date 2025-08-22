import { useState } from 'react';
import type { IStudent } from './types/types';
import ProgressBar from './components/ProgressBar';
import WelcomeStep from './components/steps/WelcomeStep';
import GardnerTestStep from './components/steps/GardnerTestStep';
import GeneralDataStep from './components/steps/GeneralDataStep';
import InterestsStep from './components/steps/InterestsStep';
import KolbTestStep from './components/steps/KolbTestStep';
import SummaryStep from './components/steps/SummaryStep';
import VAKTestStep from './components/steps/VAKTestStep';

// Tailwind CSS is used for all styling.
// Add this script tag to your HTML file if running this code in a standalone environment
// <script src="https://cdn.tailwindcss.com"></script>

// Componente principal de la aplicación
const App = () => {
  // Estados para gestionar el flujo del test y los datos del estudiante
  const [step, setStep] = useState(0);
  const [student, setStudent] = useState<IStudent>({
    name: '',
    age: '',
    grade: '',
    familySupport: 'Favorable',
    socioEmotionalLevel: 'Bueno',
    rezago: false,
    motivation: 'Motivado',
    kolbScores: { activo: 0, reflexivo: 0, teorico: 0, pragmatico: 0 },
    vakScores: { visual: 0, auditivo: 0, kinestesico: 0 },
    gardnerScores: {
      linguistica: 0,
      logicoMatematica: 0,
      visualEspacial: 0,
      corporal: 0,
      musical: 0,
      interpersonal: 0,
      intrapersonal: 0,
      naturalista: 0,
    },
    interests: '',
  });

  /*
  // Nuevos estados para la integración con la API de Gemini
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Nombres de los estilos de Kolb y las inteligencias de Gardner
  const kolbStyles = ['Activo', 'Reflexivo', 'Teórico', 'Pragmático'];
  const gardnerIntelligences = [
    'Lingüística',
    'Lógico-matemática',
    'Visual-espacial',
    'Corporal',
    'Musical',
    'Interpersonal',
    'Intrapersonal',
    'Naturalista',
  ];
  */

  // Mapeo de pasos a componentes
  const steps = [
    <WelcomeStep {...{ step, setStep }} />,
    <GeneralDataStep {...{ student, setStudent, step, setStep }} />,
    <KolbTestStep {...{ student, setStudent, step, setStep }} />,
    <VAKTestStep {...{ student, setStudent, step, setStep }} />,
    <GardnerTestStep {...{ student, setStudent, step, setStep }} />,
    <InterestsStep {...{ student, setStudent, step, setStep }} />,
    <SummaryStep {...{ student, setStudent, step, setStep }} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden my-8">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center p-6 md:p-8 rounded-t-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold">Perfil del Alumno</h1>
          <p className="mt-1 text-lg">Test para conocer tu forma de aprender</p>
        </div>
        <div className="p-6 md:p-8">
          <ProgressBar current={step} total={steps.length - 1} />
          {steps[step]}
        </div>
      </div>
    </div>
  );
};

export default App;
