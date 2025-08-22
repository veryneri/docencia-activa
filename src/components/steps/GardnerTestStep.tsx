// Componente para el test de Gardner
import type { IGardnerItem } from '../../types/types';
import type { ICommonStepProps } from './types';

const gardnerItems: IGardnerItem[] = [
  { intelligence: 'linguistica', text: 'Me gusta leer cuentos o libros.' },
  { intelligence: 'linguistica', text: 'Me gusta escribir historias o poemas.' },
  { intelligence: 'linguistica', text: 'Me gusta hablar con otros y contar cosas.' },
  { intelligence: 'logicoMatematica', text: 'Me gusta resolver acertijos o problemas.' },
  { intelligence: 'logicoMatematica', text: 'Me gusta usar los números y hacer cálculos.' },
  {
    intelligence: 'logicoMatematica',
    text: 'Me gusta buscar patrones o saber por qué pasan las cosas.',
  },
  { intelligence: 'visualEspacial', text: 'Me gusta dibujar, pintar o usar los colores.' },
  { intelligence: 'visualEspacial', text: 'Me gusta construir cosas o armar legos.' },
  { intelligence: 'visualEspacial', text: 'Me gusta imaginar cosas en mi mente.' },
  { intelligence: 'corporal', text: 'Me gusta bailar o hacer deporte.' },
  { intelligence: 'corporal', text: 'Me gusta hacer cosas con mis manos o con mi cuerpo.' },
  { intelligence: 'corporal', text: 'Me gusta moverme mucho.' },
  { intelligence: 'musical', text: 'Me gusta escuchar música.' },
  { intelligence: 'musical', text: 'Me gusta cantar canciones.' },
  { intelligence: 'musical', text: 'Me gusta tocar un instrumento.' },
  { intelligence: 'interpersonal', text: 'Me gusta ayudar a otros.' },
  { intelligence: 'interpersonal', text: 'Me gusta trabajar en equipo con mis amigos.' },
  { intelligence: 'interpersonal', text: 'Me gusta hablar con mis amigos y conocer gente.' },
  { intelligence: 'intrapersonal', text: 'Me gusta pensar en mis ideas y en cómo soy.' },
  { intelligence: 'intrapersonal', text: 'Me gusta saber lo que siento.' },
  { intelligence: 'intrapersonal', text: 'Me gusta estar solo a veces para pensar.' },
  { intelligence: 'naturalista', text: 'Me gusta cuidar las plantas o tener un jardín.' },
  { intelligence: 'naturalista', text: 'Me gusta observar a los animales.' },
  { intelligence: 'naturalista', text: 'Me gusta estar en la naturaleza.' },
];

const GardnerTestStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => (
  <div className="p-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">
      4. Inteligencias Múltiples (Gardner)
    </h3>
    <p className="mb-6 text-gray-600">
      ¿Qué tanto te gusta o qué tan bien lo haces? Elige una opción.
    </p>
    <div className="space-y-6">
      {gardnerItems.map((item, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800 mb-2">{item.text}</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => {
                  setStudent((prevData) => ({
                    ...prevData,
                    gardnerScores: {
                      ...prevData.gardnerScores,
                      [item.intelligence]: score,
                    },
                  }));
                }}
                className={`text-2xl p-2 rounded-full transition-all ${
                  student.gardnerScores[item.intelligence] === score
                    ? 'text-yellow-400 scale-125'
                    : 'text-gray-400 hover:text-yellow-300'
                }`}>
                ⭐
              </button>
            ))}
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

export default GardnerTestStep;
