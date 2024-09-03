"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizProps {
    questions: Question[];
    onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestion].correct_answer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            onComplete(
                score +
                    (selectedAnswer ===
                    questions[currentQuestion].correct_answer
                        ? 1
                        : 0)
            );
        }
    };

    const decodeHtml = (html: string): string => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const shuffleArray = (array: string[]): string[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const currentQuestionData = questions[currentQuestion];
    const answers = shuffleArray([
        ...currentQuestionData.incorrect_answers,
        currentQuestionData.correct_answer,
    ]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    {decodeHtml(currentQuestionData.question)}
                </p>
                <RadioGroup
                    value={selectedAnswer}
                    onValueChange={setSelectedAnswer}
                >
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={answer}
                                id={`answer-${index}`}
                            />
                            <Label htmlFor={`answer-${index}`}>
                                {decodeHtml(answer)}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                <Button
                    onClick={handleAnswer}
                    disabled={!selectedAnswer}
                    className="mt-4"
                >
                    {currentQuestion + 1 === questions.length
                        ? "Finish"
                        : "Next"}
                </Button>
            </CardContent>
        </Card>
    );
}
