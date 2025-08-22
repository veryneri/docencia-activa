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

  // Función para encontrar el estilo/inteligencia predominante
  const findPredominant = (
    scores: IStudent['kolbScores'] | IStudent['vakScores'] | IStudent['gardnerScores'],
  ) => {
    const entries = Object.entries(scores);
    if (entries.length === 0) return 'No definido';
    const maxScore = Math.max(...entries.map(([, score]) => score));
    const predominant = entries.filter(([, score]) => score === maxScore).map(([key]) => key);
    return predominant
      .map((key) => {
        const formatted = key
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()
          .trim();
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
      })
      .join(', ');
  };

  // Función para llamar a la API de Gemini y generar el plan
  const generatePlan = async () => {
    setIsLoading(true);
    setGeneratedPlan('');

    // Construir el prompt con los datos del estudiante
    const predominantKolb = findPredominant(student.kolbScores);
    const predominantVAK = findPredominant(student.vakScores);
    const predominantGardner = findPredominant(student.gardnerScores);

    const prompt = `Actúa como un experto en pedagogía. Analiza el siguiente perfil de alumno y genera un plan de actividades educativas personalizado en español, con 3 a 4 ideas concretas. El plan debe ser claro, conciso y fácil de entender. Incluye un título para cada actividad y una descripción de cómo se relaciona con el perfil del alumno.

    ---
    Perfil del Alumno:
    - Nombre: ${student.name}
    - Edad: ${student.age} años
    - Estilo de Aprendizaje (Kolb): ${predominantKolb}
    - Canal de Representación (VAK): ${predominantVAK}
    - Inteligencia Múltiple (Gardner): ${predominantGardner}
    - Gustos e Intereses: ${student.interests || 'No especificados'}
    ---
    `;

    let chatHistory = [];
    chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          if (response.status === 429) {
            // Too Many Requests
            retryCount++;
            const delay = Math.pow(2, retryCount) * 1000;
            console.warn(`API call failed with status 429. Retrying in ${delay}ms...`);
            await new Promise((res) => setTimeout(res, delay));
            continue; // Retry the loop
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (
          result.candidates &&
          result.candidates.length > 0 &&
          result.candidates[0].content &&
          result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0
        ) {
          const text = result.candidates[0].content.parts[0].text;
          setGeneratedPlan(text);
          break; // Exit the loop on success
        } else {
          setGeneratedPlan(
            'Lo siento, no pude generar un plan en este momento. Inténtalo de nuevo más tarde.',
          );
          break;
        }
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        setGeneratedPlan('Lo siento, ocurrió un error al generar el plan. Inténtalo de nuevo.');
        break;
      }
    }

    setIsLoading(false);
  };

  // Mapeo de pasos a componentes
  const steps = [
    <WelcomeStep {...{ step, setStep }} />,
    <GeneralDataStep {...{ student, setStudent, step, setStep }} />,
    <KolbTestStep {...{ student, setStudent, step, setStep }} />,
    <VAKTestStep {...{ student, setStudent, step, setStep }} />,
    <GardnerTestStep {...{ student, setStudent, step, setStep }} />,
    <InterestsStep {...{ student, setStudent, step, setStep }} />,
    <SummaryStep />,
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
