// Datos de niveles, temas, lecciones y quizzes
export interface Level {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface Topic {
  id: string;
  levelId: string;
  title: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  examples: { text: string; explanation: string }[];
}

export interface Quiz {
  id: string;
  topicId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const levels: Level[] = [
  {
    id: 'beginner',
    name: 'Nivel Básico',
    description: 'Fundamentos del inglés para principiantes',
    order: 1,
  },
  {
    id: 'intermediate',
    name: 'Nivel Intermedio',
    description: 'Avanza tus habilidades en inglés',
    order: 2,
  },
  {
    id: 'advanced',
    name: 'Nivel Avanzado',
    description: 'Domina el inglés como un experto',
    order: 3,
  },
];

export const topics: Topic[] = [
  // Nivel Básico
  { id: 'b1', levelId: 'beginner', title: 'Present Simple Tense', description: 'Aprende el tiempo presente simple', order: 1 },
  { id: 'b2', levelId: 'beginner', title: 'Basic Vocabulary', description: 'Vocabulario esencial del día a día', order: 2 },
  { id: 'b3', levelId: 'beginner', title: 'Question Formation', description: 'Cómo hacer preguntas en inglés', order: 3 },
  { id: 'b4', levelId: 'beginner', title: 'Pronouns & Articles', description: 'Pronombres y artículos básicos', order: 4 },
  { id: 'b5', levelId: 'beginner', title: 'Common Verbs', description: 'Verbos más usados en inglés', order: 5 },
  { id: 'b6', levelId: 'beginner', title: 'Numbers & Time', description: 'Números, fechas y hora', order: 6 },
  { id: 'b7', levelId: 'beginner', title: 'Basic Conversations', description: 'Conversaciones cotidianas', order: 7 },
  
  // Nivel Intermedio
  { id: 'i1', levelId: 'intermediate', title: 'Past Tenses', description: 'Tiempos pasados y su uso', order: 1 },
  { id: 'i2', levelId: 'intermediate', title: 'Future Forms', description: 'Expresar el futuro en inglés', order: 2 },
  { id: 'i3', levelId: 'intermediate', title: 'Conditional Sentences', description: 'Oraciones condicionales', order: 3 },
  { id: 'i4', levelId: 'intermediate', title: 'Phrasal Verbs', description: 'Verbos con preposiciones', order: 4 },
  { id: 'i5', levelId: 'intermediate', title: 'Modal Verbs', description: 'Verbos modales y su significado', order: 5 },
  { id: 'i6', levelId: 'intermediate', title: 'Relative Clauses', description: 'Cláusulas relativas', order: 6 },
  { id: 'i7', levelId: 'intermediate', title: 'Reported Speech', description: 'Discurso indirecto', order: 7 },
  
  // Nivel Avanzado
  { id: 'a1', levelId: 'advanced', title: 'Advanced Grammar', description: 'Estructuras gramaticales complejas', order: 1 },
  { id: 'a2', levelId: 'advanced', title: 'Idiomatic Expressions', description: 'Expresiones idiomáticas', order: 2 },
  { id: 'a3', levelId: 'advanced', title: 'Business English', description: 'Inglés para negocios', order: 3 },
  { id: 'a4', levelId: 'advanced', title: 'Academic Writing', description: 'Escritura académica', order: 4 },
  { id: 'a5', levelId: 'advanced', title: 'Advanced Vocabulary', description: 'Vocabulario sofisticado', order: 5 },
  { id: 'a6', levelId: 'advanced', title: 'Collocations', description: 'Combinaciones naturales de palabras', order: 6 },
  { id: 'a7', levelId: 'advanced', title: 'Nuanced Communication', description: 'Comunicación matizada y precisa', order: 7 },
];

export const lessons: Record<string, Lesson> = {
  b1: {
    id: 'b1',
    topicId: 'b1',
    title: 'Present Simple Tense',
    content: `El Present Simple es uno de los tiempos verbales más importantes en inglés. Se usa para:
    
1. **Acciones habituales o rutinas**
2. **Hechos generales o verdades universales**
3. **Horarios fijos**

**Estructura:**
- Afirmativa: Subject + verb (base form) + complement
- Negativa: Subject + don't/doesn't + verb (base form)
- Interrogativa: Do/Does + subject + verb (base form)?

**Reglas importantes:**
- Para he/she/it, añadimos -s o -es al verbo
- Verbos terminados en -y cambian a -ies (study → studies)
- Algunos verbos irregulares: have → has, go → goes`,
    examples: [
      { text: 'I work in an office.', explanation: 'Acción habitual con "I"' },
      { text: 'She studies English every day.', explanation: 'Rutina con tercera persona (changes -y to -ies)' },
      { text: 'The sun rises in the east.', explanation: 'Verdad universal' },
      { text: 'Do you like coffee?', explanation: 'Pregunta en presente simple' },
    ],
  },
  b2: {
    id: 'b2',
    topicId: 'b2',
    title: 'Basic Vocabulary',
    content: `El vocabulario básico es esencial para comunicarte en inglés. Aquí aprenderás palabras fundamentales organizadas por categorías:

**Categorías principales:**

1. **Saludos y despedidas**
   - Hello, Hi, Good morning/afternoon/evening
   - Goodbye, Bye, See you later

2. **Familia**
   - Mother, father, sister, brother
   - Grandmother, grandfather, aunt, uncle

3. **Colores**
   - Red, blue, green, yellow, black, white
   - Orange, purple, pink, brown, gray

4. **Números 1-20**
   - One through twenty

5. **Días de la semana**
   - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday`,
    examples: [
      { text: 'Hello! My name is John.', explanation: 'Saludo y presentación básica' },
      { text: 'My mother is a teacher.', explanation: 'Describiendo familia y profesión' },
      { text: 'I like the color blue.', explanation: 'Expresando preferencias con colores' },
      { text: 'Today is Monday.', explanation: 'Indicando el día de la semana' },
    ],
  },
  i1: {
    id: 'i1',
    topicId: 'i1',
    title: 'Past Tenses',
    content: `Los tiempos pasados en inglés nos permiten hablar sobre acciones que ya ocurrieron. Hay varios tipos:

**1. Past Simple**
- Para acciones completadas en el pasado
- Estructura: Subject + verb (past form)
- Regular verbs: add -ed (worked, played)
- Irregular verbs: learn each one (went, had, saw)

**2. Past Continuous**
- Para acciones en progreso en el pasado
- Estructura: Subject + was/were + verb-ing
- Uso: acciones interrumpidas o simultáneas

**3. Past Perfect**
- Para acciones que ocurrieron antes de otra acción pasada
- Estructura: Subject + had + past participle`,
    examples: [
      { text: 'I visited Paris last year.', explanation: 'Past Simple - acción completada' },
      { text: 'She was studying when I called.', explanation: 'Past Continuous - acción interrumpida' },
      { text: 'They had left before we arrived.', explanation: 'Past Perfect - acción anterior a otra' },
      { text: 'We were living in London in 2019.', explanation: 'Past Continuous - situación temporal' },
    ],
  },
  a1: {
    id: 'a1',
    topicId: 'a1',
    title: 'Advanced Grammar',
    content: `La gramática avanzada incluye estructuras complejas que dan precisión y elegancia a tu inglés:

**1. Inversion for emphasis**
- Rarely/Seldom/Never at beginning → auxiliary + subject
- "Rarely have I seen such beauty"

**2. Subjunctive mood**
- Para situaciones hipotéticas o formales
- "I suggest that he be informed immediately"

**3. Cleft sentences**
- Para énfasis: "What I need is more time"
- "It was John who called yesterday"

**4. Advanced conditionals**
- Mixed conditionals combinando tiempos
- "If I had studied harder, I would be a doctor now"`,
    examples: [
      { text: 'Never before had she felt so happy.', explanation: 'Inversión para énfasis con "never"' },
      { text: 'What concerns me most is the cost.', explanation: 'Cleft sentence para enfatizar' },
      { text: 'Had I known, I would have come earlier.', explanation: 'Inversión en condicional' },
      { text: 'It is essential that he arrive on time.', explanation: 'Subjuntivo en contexto formal' },
    ],
  },
};

export const quizzes: Record<string, Quiz> = {
  b1: {
    id: 'b1',
    topicId: 'b1',
    questions: [
      {
        id: 'q1',
        question: 'She _____ to school every day.',
        options: ['go', 'goes', 'going', 'goed'],
        correctAnswer: 1,
        explanation: 'Con "she" (tercera persona singular), añadimos -es al verbo "go".',
      },
      {
        id: 'q2',
        question: 'I _____ coffee in the morning.',
        options: ['drinks', 'drinking', 'drink', 'drinked'],
        correctAnswer: 2,
        explanation: 'Con "I", usamos la forma base del verbo sin cambios.',
      },
      {
        id: 'q3',
        question: 'The earth _____ around the sun.',
        options: ['move', 'moves', 'moving', 'moved'],
        correctAnswer: 1,
        explanation: 'Verdad universal con tercera persona singular, añadimos -s.',
      },
      {
        id: 'q4',
        question: '_____ you like pizza?',
        options: ['Does', 'Do', 'Are', 'Is'],
        correctAnswer: 1,
        explanation: 'Para preguntas con "you", usamos "Do".',
      },
      {
        id: 'q5',
        question: 'He _____ play football on Sundays.',
        options: ["don't", "doesn't", "isn't", "aren't"],
        correctAnswer: 1,
        explanation: 'Para negación con "he", usamos "doesn\'t" + verbo base.',
      },
    ],
  },
  b2: {
    id: 'b2',
    topicId: 'b2',
    questions: [
      {
        id: 'q1',
        question: 'How do you say "buenos días" in English?',
        options: ['Good night', 'Good morning', 'Good afternoon', 'Hello'],
        correctAnswer: 1,
        explanation: '"Good morning" es el saludo para la mañana.',
      },
      {
        id: 'q2',
        question: 'The color of the sky is _____.',
        options: ['red', 'blue', 'green', 'yellow'],
        correctAnswer: 1,
        explanation: 'El cielo es azul (blue).',
      },
      {
        id: 'q3',
        question: 'My father\'s mother is my _____.',
        options: ['aunt', 'sister', 'grandmother', 'mother'],
        correctAnswer: 2,
        explanation: 'La madre de tu padre es tu abuela (grandmother).',
      },
      {
        id: 'q4',
        question: 'What comes after Monday?',
        options: ['Sunday', 'Tuesday', 'Wednesday', 'Friday'],
        correctAnswer: 1,
        explanation: 'Después del lunes viene martes (Tuesday).',
      },
      {
        id: 'q5',
        question: 'Which number is "fifteen"?',
        options: ['5', '15', '50', '51'],
        correctAnswer: 1,
        explanation: 'Fifteen es el número 15.',
      },
    ],
  },
  i1: {
    id: 'i1',
    topicId: 'i1',
    questions: [
      {
        id: 'q1',
        question: 'I _____ to London last summer.',
        options: ['go', 'goes', 'went', 'going'],
        correctAnswer: 2,
        explanation: '"Went" es el pasado irregular del verbo "go".',
      },
      {
        id: 'q2',
        question: 'They _____ dinner when I arrived.',
        options: ['had', 'were having', 'have', 'are having'],
        correctAnswer: 1,
        explanation: 'Past Continuous para acción en progreso en el pasado.',
      },
      {
        id: 'q3',
        question: 'She _____ already left when we got there.',
        options: ['has', 'had', 'have', 'was'],
        correctAnswer: 1,
        explanation: 'Past Perfect porque ocurrió antes de otra acción pasada.',
      },
      {
        id: 'q4',
        question: 'What _____ you doing at 8pm yesterday?',
        options: ['was', 'were', 'are', 'did'],
        correctAnswer: 1,
        explanation: 'Past Continuous interrogativo con "you" usa "were".',
      },
      {
        id: 'q5',
        question: 'By the time I woke up, they _____ breakfast.',
        options: ['ate', 'have eaten', 'had eaten', 'were eating'],
        correctAnswer: 2,
        explanation: 'Past Perfect porque el desayuno ocurrió antes de despertar.',
      },
    ],
  },
  a1: {
    id: 'a1',
    topicId: 'a1',
    questions: [
      {
        id: 'q1',
        question: 'Seldom _____ such dedication.',
        options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
        correctAnswer: 1,
        explanation: 'Con "seldom" al inicio, invertimos auxiliar + sujeto.',
      },
      {
        id: 'q2',
        question: 'It is essential that he _____ present.',
        options: ['is', 'be', 'was', 'will be'],
        correctAnswer: 1,
        explanation: 'Subjuntivo usa la forma base "be" después de "essential that".',
      },
      {
        id: 'q3',
        question: 'What _____ is a solution to this problem.',
        options: ['I need', 'need I', 'do I need', 'needed I'],
        correctAnswer: 0,
        explanation: 'Cleft sentence para énfasis: "What + clause".',
      },
      {
        id: 'q4',
        question: '_____ known about it, I would have told you.',
        options: ['If I had', 'Had I', 'I had', 'Did I'],
        correctAnswer: 1,
        explanation: 'Inversión en condicional: omitimos "if" e invertimos.',
      },
      {
        id: 'q5',
        question: 'It was John _____ broke the window.',
        options: ['who', 'which', 'what', 'when'],
        correctAnswer: 0,
        explanation: 'Cleft sentence con "who" para enfatizar la persona.',
      },
    ],
  },
};
