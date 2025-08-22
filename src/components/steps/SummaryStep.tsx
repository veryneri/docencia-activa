// Componente de resumen de resultados
const SummaryStep = () => {
  // Función para encontrar el estilo/inteligencia predominante
  const findPredominant = (scores) => {
    const entries = Object.entries(scores);
    if (entries.length === 0) return 'No definido';
    const maxScore = Math.max(...entries.map(([, score]) => score));
    const predominant = entries.filter(([, score]) => score === maxScore).map(([key]) => key);
    return predominant
      .map((key) => {
        // Formatear la clave para que se vea bien en el texto
        const formatted = key
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()
          .trim();
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
      })
      .join(', ');
  };

  const predominantKolb = findPredominant(studentData.kolbScores);
  const predominantVAK = findPredominant(studentData.vakScores);
  const predominantGardner = findPredominant(studentData.gardnerScores);

  // Componente para mostrar un resultado individual en el resumen
  const ResultCard = ({ title, result, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
      <h4 className="text-xl font-bold mb-2 text-blue-700">{title}</h4>
      <p className="text-lg text-gray-800">{result}</p>
      {children}
    </div>
  );

  return (
    <div className="p-6">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-700">
        ¡Perfil de {studentData.name} listo!
      </h3>
      <p className="text-gray-700 mb-8 text-center">
        Aquí tienes un resumen de los resultados del test.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <ResultCard title="Datos Generales" result="">
          <ul className="text-gray-600 list-disc list-inside">
            <li>*Nombre:* {studentData.name}</li>
            <li>*Edad:* {studentData.age} años</li>
            <li>*Grado:* {studentData.grade}</li>
          </ul>
        </ResultCard>

        <ResultCard
          title="Estilo de Aprendizaje (Kolb)"
          result={`Predominante: ${predominantKolb}`}>
          <div className="mt-2 space-y-1">
            {Object.entries(studentData.kolbScores).map(([key, value]) => (
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
          </div>
        </ResultCard>

        <ResultCard
          title="Canal de Representación (VAK)"
          result={`Predominante: ${predominantVAK}`}>
          <div className="mt-2 space-y-1">
            {Object.entries(studentData.vakScores).map(([key, value]) => (
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
          </div>
        </ResultCard>

        <ResultCard
          title="Inteligencia Múltiple (Gardner)"
          result={`Predominante: ${predominantGardner}`}>
          <div className="mt-2 space-y-1">
            {Object.entries(studentData.gardnerScores).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm text-gray-600">
                <span className="capitalize">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase()
                    .trim()}
                  :
                </span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-400 h-2.5 rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}></div>
                </div>
                <span>{value} / 5</span>
              </div>
            ))}
          </div>
        </ResultCard>

        {studentData.interests && (
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h4 className="text-xl font-bold mb-2 text-blue-700">Gustos e Intereses</h4>
            <p className="text-gray-700 italic">{studentData.interests}</p>
          </div>
        )}
      </div>

      {/* Sección de generación de plan con Gemini API */}
      <div className="flex flex-col items-center mt-8">
        <button
          onClick={generatePlan}
          disabled={isLoading || !studentData.name}
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

export default SummaryStep;
