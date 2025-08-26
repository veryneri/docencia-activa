// Componente para el test de Gardner
import type { IGardnerItem, TGardnerIntelligence } from '../../types/types';
import type { ICommonStepProps } from './types';

const gardnerItems: IGardnerItem[] = [
  { id: '1', intelligence: 'linguistica', text: 'Me gusta leer cuentos o libros.' },
  { id: '2', intelligence: 'linguistica', text: 'Me gusta escribir historias o poemas.' },
  { id: '3', intelligence: 'linguistica', text: 'Me gusta hablar con otros y contar cosas.' },
  { id: '4', intelligence: 'logicoMatematica', text: 'Me gusta resolver acertijos o problemas.' },
  {
    id: '5',
    intelligence: 'logicoMatematica',
    text: 'Me gusta usar los números y hacer cálculos.',
  },
  {
    id: '6',
    intelligence: 'logicoMatematica',
    text: 'Me gusta buscar patrones o saber por qué pasan las cosas.',
  },
  { id: '7', intelligence: 'visualEspacial', text: 'Me gusta dibujar, pintar o usar los colores.' },
  { id: '8', intelligence: 'visualEspacial', text: 'Me gusta construir cosas o armar legos.' },
  { id: '9', intelligence: 'visualEspacial', text: 'Me gusta imaginar cosas en mi mente.' },
  { id: '10', intelligence: 'corporal', text: 'Me gusta bailar o hacer deporte.' },
  {
    id: '11',
    intelligence: 'corporal',
    text: 'Me gusta hacer cosas con mis manos o con mi cuerpo.',
  },
  { id: '12', intelligence: 'corporal', text: 'Me gusta moverme mucho.' },
  { id: '13', intelligence: 'musical', text: 'Me gusta escuchar música.' },
  { id: '14', intelligence: 'musical', text: 'Me gusta cantar canciones.' },
  { id: '15', intelligence: 'musical', text: 'Me gusta tocar un instrumento.' },
  { id: '16', intelligence: 'interpersonal', text: 'Me gusta ayudar a otros.' },
  { id: '17', intelligence: 'interpersonal', text: 'Me gusta trabajar en equipo con mis amigos.' },
  {
    id: '18',
    intelligence: 'interpersonal',
    text: 'Me gusta hablar con mis amigos y conocer gente.',
  },
  { id: '19', intelligence: 'intrapersonal', text: 'Me gusta pensar en mis ideas y en cómo soy.' },
  { id: '20', intelligence: 'intrapersonal', text: 'Me gusta saber lo que siento.' },
  { id: '21', intelligence: 'intrapersonal', text: 'Me gusta estar solo a veces para pensar.' },
  { id: '22', intelligence: 'naturalista', text: 'Me gusta cuidar las plantas o tener un jardín.' },
  { id: '23', intelligence: 'naturalista', text: 'Me gusta observar a los animales.' },
  { id: '24', intelligence: 'naturalista', text: 'Me gusta estar en la naturaleza.' },
];

// eslint-disable-next-line react-refresh/only-export-components
export const getGardnerIntelligencesPossiblePoints = () => {
  const dist: {
    [key in TGardnerIntelligence]: number;
  } = {
    linguistica: 0,
    logicoMatematica: 0,
    visualEspacial: 0,
    corporal: 0,
    musical: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalista: 0,
  };

  gardnerItems.forEach((item) => (dist[item.intelligence] = dist[item.intelligence] + 5));

  return dist;
};

const GardnerTestStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => {
  const gardnerItemProps = { student, setStudent };

  return (
    <div className="p-6">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">
        4. Inteligencias Múltiples (Gardner)
      </h3>
      <p className="mb-6 text-gray-600">
        ¿Qué tanto te gusta o qué tan bien lo haces? Elige una opción.
      </p>
      <div className="space-y-6">
        {gardnerItems.map((item) => (
          <GardnerItem key={item.id} {...{ ...gardnerItemProps, item }} />
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
};

type TGardnerItemProps = { item: IGardnerItem } & Pick<ICommonStepProps, 'student' | 'setStudent'>;

const GardnerItem = ({ item, student, setStudent }: TGardnerItemProps) => {
  const currentItemScore = student.extendedGardnerScores[item.intelligence].find(
    (q) => q.id === item.id,
  );

  const setScore = (score: number) => {
    const itemCurrentScoreIndex = student.extendedGardnerScores[item.intelligence].findIndex(
      (i) => i.id === item.id,
    );
    const newExtendedGardnerScores = { ...student.extendedGardnerScores };
    if (itemCurrentScoreIndex !== -1) {
      newExtendedGardnerScores[item.intelligence][itemCurrentScoreIndex].score = score;
    } else {
      newExtendedGardnerScores[item.intelligence] = [
        ...newExtendedGardnerScores[item.intelligence],
        { id: item.id, score },
      ];
    }

    setStudent((prevData) => ({
      ...prevData,
      gardnerScores: {
        ...prevData.gardnerScores,
        [item.intelligence]: score,
      },
      extendedGardnerScores: newExtendedGardnerScores,
    }));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <p className="font-semibold text-gray-800 mb-2">{item.text}</p>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => setScore(score)}
            className={`text-2xl p-2 rounded-full transition-all ${
              currentItemScore && currentItemScore.score === score
                ? 'text-yellow-400 scale-125'
                : 'text-gray-400 hover:text-yellow-300'
            }`}>
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
};

export default GardnerTestStep;
