// Componente para el test VAK
import type { IVakItem } from '../../types/types';
import type { ICommonStepProps } from './types';

const vakItems: IVakItem[] = [
  {
    id: '1',
    text: 'Entiendo mejor cuando veo dibujos, fotos o esquemas.',
    type: 'visual',
    emoji: '🖼️',
  },
  {
    id: '2',
    text: 'Aprendo más cuando escucho al maestro o a un audio.',
    type: 'auditivo',
    emoji: '🎧',
  },
  {
    id: '3',
    text: 'Me gusta aprender haciendo cosas con mi cuerpo, moviéndome.',
    type: 'kinestesico',
    emoji: '🏃',
  },
  {
    id: '4',
    text: 'Recuerdo las cosas viendo imágenes en mi mente.',
    type: 'visual',
    emoji: '🧠🖼️',
  },
  {
    id: '5',
    text: 'Recuerdo lo que escuché en una clase o conversación.',
    type: 'auditivo',
    emoji: '🔊',
  },
  {
    id: '6',
    text: 'Recuerdo lo que hice con mis manos o mi cuerpo.',
    type: 'kinestesico',
    emoji: '✋',
  },
];

const VAKTestStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => (
  <div className="p-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">
      3. Canales de Representación (VAK)
    </h3>
    <p className="mb-6 text-gray-600">Elige la opción que más te identifica.</p>
    <div className="space-y-4">
      {vakItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-3xl">{item.emoji}</span>
          <p className="text-gray-800 flex-1">{item.text}</p>
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={student.extendedVakScores[item.type].includes(item.id)}
              onChange={(e) => {
                setStudent((prevData) => {
                  const newExtendedVakScores = { ...prevData.extendedVakScores };
                  const newVakScores = { ...prevData.vakScores };
                  if (e.target.checked) {
                    newVakScores[item.type] += 1;
                    newExtendedVakScores[item.type] = [...newExtendedVakScores[item.type], item.id];
                  } else {
                    newVakScores[item.type] -= 1;
                    newExtendedVakScores[item.type] = newExtendedVakScores[item.type].filter(
                      (i) => i !== item.id,
                    );
                  }
                  return {
                    ...prevData,
                    vakScores: newVakScores,
                    extendedVakScores: newExtendedVakScores,
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

export default VAKTestStep;
