export function validateGradeType(grade) {
  let gradeContent

  if (typeof grade === "number") {
    gradeContent = grade > 0 ? grade.toFixed(2) : "-"
  } else if (grade === "AP" || grade === "RP") {
    gradeContent = grade
  } else if (grade.length > 0) {
    gradeContent = parseFloat(grade).toFixed(2)
  } else {
    gradeContent = "-"
  }

  return gradeContent
}

export function semesterAverage(materias) {
  // Filtrar materias con NOTAA válida y CREDITOS válidos
  const validMaterias = materias.filter((materia) => {
    const nota = parseFloat(materia.NOTAA);
    const creditos = parseFloat(materia.SFRSTCR_CREDIT_HR);
    // Verificar si nota y creditos son números finitos y que la nota no sea undefined o vacía
    return (
      materia.NOTAA !== undefined && materia.NOTAA !== '' &&
      !Number.isNaN(nota) &&
      Number.isFinite(nota) &&
      !Number.isNaN(creditos) &&
      Number.isFinite(creditos)
    );
  });

  // Si no hay materias válidas, retornar 0
  if (validMaterias.length === 0) {
    return 0;
  }

  // Calcular el total de puntos ponderados (NOTAA * CREDITOS) y total de créditos en una sola pasada
  const { totalPonderado, totalCreditos } = validMaterias.reduce(
    (acc, materia) => {
      const nota = parseFloat(materia.NOTAA);
      const creditos = parseFloat(materia.SFRSTCR_CREDIT_HR);
      acc.totalPonderado += nota * creditos;
      acc.totalCreditos += creditos;
      return acc;
    },
    { totalPonderado: 0, totalCreditos: 0 }
  );

  // Retornar el promedio ponderado
  return totalCreditos > 0 ? totalPonderado / totalCreditos : 0;
}


export function calculateSemesterCredits(materias) {
  return materias.reduce((acc, materia) => {
    return acc + materia.SFRSTCR_CREDIT_HR
  }, 0)
}
