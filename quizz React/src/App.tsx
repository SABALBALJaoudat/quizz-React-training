import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import './App.css'

const questions = [
  {
    id: 1,
    question: "Quelle est la principale différence entre React.js et React Native ?",
    options: [
      "React.js est utilisé pour le développement web, React Native pour les applications mobiles",
      "React.js utilise JavaScript, React Native utilise TypeScript",
      "React.js est plus ancien que React Native",
      "Il n'y a pas de différence significative"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Dans TypeScript, que signifie le mot-clé 'interface' ?",
    options: [
      "Une classe abstraite",
      "Un type de données",
      "Une structure de données pour définir la forme d'un objet",
      "Un module"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Quelle est la syntaxe correcte pour déclarer un état dans un composant fonctionnel React ?",
    options: [
      "this.state = { count: 0 }",
      "const [count, setCount] = useState(0)",
      "state = { count: 0 }",
      "useState({ count: 0 })"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Quel est l'avantage principal d'utiliser TypeScript avec React ?",
    options: [
      "Il rend le code plus rapide à l'exécution",
      "Il ajoute un typage statique et améliore l'autocomplétion",
      "Il réduit la taille du bundle final",
      "Il permet d'utiliser des composants class uniquement"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Quelle méthode du cycle de vie n'existe pas dans les composants fonctionnels React ?",
    options: [
      "useEffect",
      "useState",
      "componentDidMount",
      "useMemo"
    ],
    correctAnswer: 2
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Quiz React.js et TypeScript</CardTitle>
        </CardHeader>
        <CardContent>
          {showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
              <p className="text-xl mb-4">Votre score : {score} / {questions.length}</p>
              <Button onClick={resetQuiz}>Recommencer le quiz</Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Question {currentQuestion + 1} / {questions.length}
              </h2>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <RadioGroup
                value={selectedAnswer !== null ? selectedAnswer.toString() : undefined}
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                className="space-y-2"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="p-0"/>
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {!showCorrectAnswer ? (
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="mt-4"
                >
                  Vérifier la réponse
                </Button>
              ) : (
                <>
                  <Alert className="mt-4">
                    <AlertDescription>
                      {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                        <span className="text-green-600 font-semibold">Correct !</span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Incorrect. La bonne réponse est : {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleNextQuestion}
                    className="mt-4"
                  >
                    {currentQuestion === questions.length - 1 ? "Voir le résultat" : "Question suivante"}
                  </Button>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default App
