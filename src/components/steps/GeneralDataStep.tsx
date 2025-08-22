// Componente para datos generales
import type { ICommonStepProps } from './types';

const GeneralDataStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => (
  <div className="p-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">1. Datos Generales</h3>
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          placeholder="Tu nombre completo"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-gray-700 font-medium">
          Edad
        </label>
        <input
          id="age"
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
          placeholder="Tu edad"
        />
      </div>
      <div>
        <label htmlFor="grade" className="block text-gray-700 font-medium">
          Grado y grupo
        </label>
        <input
          id="grade"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          value={student.grade}
          onChange={(e) => setStudent({ ...student, grade: e.target.value })}
          placeholder="Ej. 3° B"
        />
      </div>
    </div>
    <div className="flex justify-end mt-6">
      <button
        onClick={() => setStep(step + 1)}
        disabled={!student.name || !student.age || !student.grade}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors">
        Siguiente
      </button>
    </div>
  </div>
);

export default GeneralDataStep;
