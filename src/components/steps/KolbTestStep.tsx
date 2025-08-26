// Componente para el test de Kolb
import type { IKolbItem } from '../../types/types';
import type { ICommonStepProps } from './types';

// Items para cada test, con emojis para un formato amigable
const kolbItems: IKolbItem[] = [
  { text: 'Me gusta aprender haciendo cosas con mis manos.', type: 'activo', emoji: '🛠️', id: '1' },
  {
    text: 'Prefiero pensar bien antes de empezar a hacer algo.',
    type: 'reflexivo',
    emoji: '🤔',
    id: '2',
  },
  {
    text: 'Me gusta que me expliquen bien el porqué de las cosas.',
    type: 'teorico',
    emoji: '📖',
    id: '3',
  },
  {
    text: 'Aprendo mejor cuando puedo usar lo que aprendo en la vida real.',
    type: 'pragmatico',
    emoji: '🧪',
    id: '4',
  },
  {
    text: 'Me gusta trabajar en equipo o jugar para aprender.',
    type: 'activo',
    emoji: '🎲',
    id: '5',
  },
  { text: 'Me gusta observar y pensar en lo que pasa.', type: 'reflexivo', emoji: '👀', id: '6' },
  {
    text: 'Me gusta leer las instrucciones o escuchar explicaciones completas.',
    type: 'teorico',
    emoji: '📚',
    id: '7',
  },
  {
    text: 'Me gusta probar cómo funciona algo yo mismo.',
    type: 'pragmatico',
    emoji: '⚙️',
    id: '8',
  },
];

const KolbTestStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => (
  <div className="p-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">
      2. Estilos de Aprendizaje (David Kolb)
    </h3>
    <p className="mb-6 text-gray-600">Elige la opción que mejor te describa.</p>
    <div className="space-y-4">
      {kolbItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-3xl">{item.emoji}</span>
          <p className="text-gray-800 flex-1">{item.text}</p>
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={student.extendedKolbScores[item.type].includes(item.id)}
              onChange={(e) => {
                setStudent((prevData) => {
                  const newKolbScores = { ...prevData.kolbScores };
                  const newExtendedKolbScores = { ...prevData.extendedKolbScores };
                  if (e.target.checked) {
                    newKolbScores[item.type] += 1;
                    newExtendedKolbScores[item.type] = [
                      ...newExtendedKolbScores[item.type],
                      item.id,
                    ];
                  } else {
                    newKolbScores[item.type] -= 1;
                    newExtendedKolbScores[item.type] = newExtendedKolbScores[item.type].filter(
                      (i) => i !== item.id,
                    );
                  }
                  console.log(
                    'newKolbScores: ',
                    newKolbScores,
                    'newExtendedKolbScores: ',
                    newExtendedKolbScores,
                  );
                  return {
                    ...prevData,
                    kolbScores: newKolbScores,
                    extendedKolbScores: newExtendedKolbScores,
                  };
                });
              }}
              className="form-checkbox h-6 w-6 text-blue-600 rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-6">
      <button
        onClick={() => setStep(step - 1)}
        className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors">
        Atrás
      </button>
      <button
        onClick={() => setStep(step + 1)}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        Siguiente
      </button>
    </div>
  </div>
);

export default KolbTestStep;
