import { useState } from "react";
import ExamCard from "@/components/ui/exam-card";
import { Icon } from '@iconify/react';
import { FilterButton } from "@/components/ui/filter-button";
import Head from 'next/head';

// Mock data for development
const mockExams = [
    {
        id: 1,
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
        category: "Matematik",
        title: "TYT Matematik Deneme Sınavı 1",
        slug: "tyt-matematik-deneme-1",
        duration: "135 dk",
        questionCount: 40,
        difficulty: "Orta"
    },
    {
        id: 2,
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
        category: "Türkçe",
        title: "TYT Türkçe Deneme Sınavı 1",
        slug: "tyt-turkce-deneme-1",
        duration: "90 dk",
        questionCount: 30,
        difficulty: "Kolay"
    },
    {
        id: 3,
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
        category: "Fizik",
        title: "AYT Fizik Deneme Sınavı 1",
        slug: "ayt-fizik-deneme-1",
        duration: "60 dk",
        questionCount: 20,
        difficulty: "Zor"
    },
    // Add more mock exams as needed
];

const categories = ["Tümü", "Matematik", "Türkçe", "Fizik", "Kimya", "Biyoloji"];
const difficulties = ["Tümü", "Kolay", "Orta", "Zor"];
const examTypes = ["Tümü", "TYT", "AYT"];

export default function Exams() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [selectedDifficulty, setSelectedDifficulty] = useState("Tümü");
    const [selectedType, setSelectedType] = useState("Tümü");

    const filteredExams = mockExams.filter((exam) => {
        const matchesSearch = exam.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "Tümü" || exam.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === "Tümü" || exam.difficulty === selectedDifficulty;
        const matchesType =
            selectedType === "Tümü" || exam.title.includes(selectedType);

        return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
    });

    return (
        <>
            <Head>
                <title>Sınavlar | PixelSınav</title>
            </Head>
            <div className="max-w-7xl container mx-auto px-4 py-8 min-h-screen bg-dark">
                {/* Search and Filter Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Sınav Ara"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-[300px] px-4 py-3 bg-dark-800 border border-gray text-white font-nunito transition-all duration-300
                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                        <Icon
                            icon="pixelarticons:search"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        {/* Category Filter */}
                        <FilterButton
                            value={selectedCategory}
                            placeholder="Kategorilere Göre Filtrele"
                            options={categories.map(category => ({ label: category, value: category }))}
                            onChange={setSelectedCategory}
                        />

                        {/* Difficulty Filter */}
                        <FilterButton
                            value={selectedDifficulty}
                            placeholder="Zorluk Seviyesi"
                            options={difficulties.map(diff => ({ label: diff, value: diff }))}
                            onChange={setSelectedDifficulty}
                        />

                        {/* Exam Type Filter */}
                        <FilterButton
                            value={selectedType}
                            placeholder="Sınav Türü"
                            options={examTypes.map(type => ({ label: type, value: type }))}
                            onChange={setSelectedType}
                        />
                    </div>
                </div>

                {/* Exams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.map((exam) => (
                        <ExamCard
                            key={exam.id}
                            image={exam.image}
                            category={exam.category}
                            title={exam.title}
                            slug={exam.slug}
                            duration={exam.duration}
                            questionCount={exam.questionCount}
                            difficulty={exam.difficulty}
                        />
                    ))}
                </div>

                {/* No Results Message */}
                {filteredExams.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-text text-lg">
                            Aradığınız kriterlere uygun sınav bulunamadı.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
