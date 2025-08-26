// Componente de resumen de resultados
import { useEffect, useState } from 'react';
import type { IGardnerItemScore, IStudent, TGardnerIntelligence } from '../../types/types';
import type { ICommonStepProps } from './types';
import { getGardnerIntelligencesPossiblePoints } from './GardnerTestStep';

// Función para encontrar el estilo/inteligencia predominante
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// Función para encontrar el estilo/inteligencia predominante
const extendedFindPredominant = (
  scores: IStudent['extendedKolbScores'] | IStudent['extendedVakScores'],
) => {
  const entries = Object.entries(scores);
  if (entries.length === 0) return 'No definido';
  const maxScore = Math.max(...entries.map(([, score]) => score.length));
  const predominant = entries.filter(([, score]) => score.length === maxScore).map(([key]) => key);
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

const getGardnerIntelligenceScore = (scores: IGardnerItemScore[]) =>
  scores.reduce((acc, itemScore) => acc + itemScore.score, 0);

// Función para encontrar el estilo/inteligencia predominante
const extendedFindGardnerPredominant = (scores: IStudent['extendedGardnerScores']) => {
  const entries = Object.entries(scores);
  if (entries.length === 0) return 'No definido';
  const predominant = entries.reduce(
    (acc: { intelligence: TGardnerIntelligence; accScore: number }[], [intelligence, score]) => {
      const currentIntelligenceWithScore = {
        intelligence: intelligence as TGardnerIntelligence,
        accScore: getGardnerIntelligenceScore(score),
      };

      console.log('acc: ', acc, 'currentIntelligenceWithScore: ', currentIntelligenceWithScore);

      if (!acc.length) {
        return [currentIntelligenceWithScore];
      }

      if (acc[0].accScore > currentIntelligenceWithScore.accScore) {
        return acc;
      }

      if (acc[0].accScore === currentIntelligenceWithScore.accScore) {
        return [...acc, currentIntelligenceWithScore];
      }

      return [currentIntelligenceWithScore];
    },
    [],
  );

  return predominant
    .map((key) => {
      const formatted = key.intelligence
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    })
    .join(', ');
};

const SummaryStep = ({ student }: ICommonStepProps) => {
  const predominantKolb = extendedFindPredominant(student.extendedKolbScores);
  const predominantVAK = extendedFindPredominant(student.extendedVakScores);
  const predominantGardner = extendedFindGardnerPredominant(student.extendedGardnerScores);

  const predominantCommonProps: IPredominantCommonProps = {
    predominantGardner,
    predominantKolb,
    predominantVAK,
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-700">
        ¡Perfil de {student.name} listo!
      </h3>
      <p className="text-gray-700 mb-8 text-center">
        Aquí tienes un resumen de los resultados del test.
      </p>

      <ResultsSection {...{ student, ...predominantCommonProps }} />
      <PlanSection {...{ student, ...predominantCommonProps }} />

      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
          Imprimir Perfil
        </button>
      </div>
    </div>
  );
};

type TSectionCommonPlanProps = {
  student: IStudent;
} & IPredominantCommonProps;

const ResultsSection = ({
  student,
  predominantGardner,
  predominantKolb,
  predominantVAK,
}: TSectionCommonPlanProps) => {
  console.log(student);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ResultCard title="Datos Generales" result="">
        <ul className="text-gray-600 list-disc list-inside">
          <li>*Nombre:* {student.name}</li>
          <li>*Edad:* {student.age} años</li>
          <li>*Grado:* {student.grade}</li>
        </ul>
      </ResultCard>

      <ResultCard title="Estilo de Aprendizaje (Kolb)" result={`Predominante: ${predominantKolb}`}>
        <div className="mt-2 space-y-1">
          {Object.entries(student.kolbScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span className="capitalize">{key}:</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-400 h-2.5 rounded-full"
                  style={{ width: `${(value / 2) * 100}%` }}></div>
              </div>
              <span>{value} / 2</span>
            </div>
          ))}
          {Object.entries(student.extendedKolbScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span className="capitalize">{key}:</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-400 h-2.5 rounded-full"
                  style={{
                    width: `${(value.length / 2) * 100}%`,
                  }}></div>
              </div>
              <span>{value.length} / 2</span>
            </div>
          ))}
        </div>
      </ResultCard>

      <ResultCard title="Canal de Representación (VAK)" result={`Predominante: ${predominantVAK}`}>
        <div className="mt-2 space-y-1">
          {Object.entries(student.vakScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span className="capitalize">{key}:</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-400 h-2.5 rounded-full"
                  style={{ width: `${(value / 2) * 100}%` }}></div>
              </div>
              <span>{value} / 2</span>
            </div>
          ))}
          {Object.entries(student.extendedKolbScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span className="capitalize">{key}:</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-400 h-2.5 rounded-full"
                  style={{
                    width: `${(value.length / 2) * 100}%`,
                  }}></div>
              </div>
              <span>{value.length} / 2</span>
            </div>
          ))}
        </div>
      </ResultCard>

      <GardnerResultCard
        predominantGardner={predominantGardner}
        extendedGardnerScores={student.extendedGardnerScores}
      />
      {student.interests && <InterestsResults interests={student.interests} />}
    </div>
  );
};

type TGardnerResultCardProps = {
  predominantGardner: string;
} & Pick<IStudent, 'extendedGardnerScores'>;

const GardnerResultCard = ({
  predominantGardner,
  extendedGardnerScores,
}: TGardnerResultCardProps) => {
  const pointsDist = getGardnerIntelligencesPossiblePoints();

  return (
    <ResultCard
      title="Inteligencia Múltiple (Gardner)"
      result={`Predominante: ${predominantGardner}`}>
      <div className="mt-2 space-y-1">
        {Object.entries(extendedGardnerScores).map(([key]) => {
          const currentIntelligenceScore = getGardnerIntelligenceScore(
            extendedGardnerScores[key as TGardnerIntelligence],
          );
          const currentIntelligencePossiblePoints = pointsDist[key as TGardnerIntelligence];

          return (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span className="capitalize">
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .trim()}
                :
              </span>
              <div className="w-2/5 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-400 h-2.5 rounded-full"
                  style={{
                    width: `${(currentIntelligenceScore / currentIntelligencePossiblePoints) * 100}%`,
                  }}></div>
              </div>
              <span>
                {currentIntelligenceScore} / {currentIntelligencePossiblePoints}
              </span>
            </div>
          );
        })}
      </div>
    </ResultCard>
  );
};

interface IPredominantCommonProps {
  predominantKolb: string;
  predominantVAK: string;
  predominantGardner: string;
}

type IInterestsResultsProps = Pick<IStudent, 'interests'>;

const InterestsResults = ({ interests }: IInterestsResultsProps) => (
  <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
    <h4 className="text-xl font-bold mb-2 text-blue-700">Gustos e Intereses</h4>
    <p className="text-gray-700 italic">{interests}</p>
  </div>
);

// Componente para mostrar un resultado individual en el resumen
interface IResultCardProps {
  title: string;
  result: string;
  children: React.ReactNode;
}

const ResultCard = ({ title, result, children }: IResultCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
    <h4 className="text-xl font-bold mb-2 text-blue-700">{title}</h4>
    <p className="text-lg text-gray-800">{result}</p>
    {children}
  </div>
);

/*Sección de generación de plan con Gemini API*/
const PlanSection = ({
  student,
  predominantGardner,
  predominantKolb,
  predominantVAK,
}: TSectionCommonPlanProps) => {
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setGeneratedPlan('');
    generatePlan();
  }, []);

  // Función para llamar a la API de Gemini y generar el plan
  const generatePlan = async () => {
    // Construir el prompt con los datos del estudiante
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

    const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <button
          onClick={generatePlan}
          disabled={isLoading || !student.name}
          className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 disabled:bg-gray-400 transition-colors">
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generando plan...</span>
            </>
          ) : (
            <span>✨ Generar Plan de Actividades Personalizado</span>
          )}
        </button>
      </div>

      {generatedPlan && (
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg shadow-inner border-l-4 border-yellow-400">
          <h4 className="text-xl font-bold mb-4 text-yellow-800">
            Plan de Actividades Personalizado
          </h4>
          <div className="whitespace-pre-wrap text-gray-800">{generatedPlan}</div>
        </div>
      )}
    </>
  );
};

export default SummaryStep;
