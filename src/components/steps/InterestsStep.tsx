// Componente para gustos e intereses
import type { ICommonStepProps } from './types';

const InterestsStep = ({ student, setStudent, step, setStep }: ICommonStepProps) => (
  <div className="p-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">5. Gustos e Intereses</h3>
    <div className="space-y-4">
      <div>
        <label htmlFor="interests" className="block text-gray-700 font-medium">
          ¿Qué te gusta hacer en tu tiempo libre? ¿Cuál es tu materia favorita?
        </label>
        <textarea
          id="interests"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          rows={4}
          value={student.interests}
          onChange={(e) => setStudent({ ...student, interests: e.target.value })}
          placeholder="Escribe aquí tus gustos, hobbies o lo que te interesa."></textarea>
      </div>
    </div>
    <div className="flex justify-between mt-6">
      <button
        onClick={() => setStep(step - 1)}
        className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors">
        Atrás
      </button>
      <button
        onClick={() => setStep(step + 1)}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors">
        Terminar
      </button>
    </div>
  </div>
);

export default InterestsStep;
