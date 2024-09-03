"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Quiz from "./quiz";

const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 18, name: "Science: Computers" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
];

export default function Home() {
    const [category, setCategory] = useState("");
    const [questionCount, setQuestionCount] = useState("5");
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState<number | null>(null);

    const handleStartQuiz = async () => {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${questionCount}&category=${category}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
    };

    const handleQuizComplete = (finalScore: number) => {
        setScore(finalScore);
        setQuestions(null);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Quiz App</CardTitle>
                </CardHeader>
                <CardContent>
                    {!questions && score === null && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Select Category
                                </Label>
                                <Select onValueChange={setCategory}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem
                                                key={cat.id}
                                                value={cat.id.toString()}
                                            >
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="questionCount">
                                    Number of Questions
                                </Label>
                                <Input
                                    id="questionCount"
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={questionCount}
                                    onChange={(e) =>
                                        setQuestionCount(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                onClick={handleStartQuiz}
                                disabled={!category || !questionCount}
                            >
                                Start Quiz
                            </Button>
                        </div>
                    )}
                    {questions && (
                        <Quiz
                            questions={questions}
                            onComplete={handleQuizComplete}
                        />
                    )}
                    {score !== null && (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">
                                Quiz Completed!
                            </h2>
                            <p className="text-xl">
                                Your score: {score} out of {questionCount}
                            </p>
                            <Button
                                onClick={() => setScore(null)}
                                className="mt-4"
                            >
                                Start New Quiz
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
