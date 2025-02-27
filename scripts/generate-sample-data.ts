import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

// Seed for reproducible random numbers
let seed = 42;
const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

// Configuration
const START_DATE = new Date('2022-01-01');
const END_DATE = new Date('2025-02-27');
const PROBABILITY_OF_DATA = 0.99; // 99% of days will have data

// Define types for habit configurations
interface BaseHabitConfig {
    type: 'boolean' | 'integer' | 'string';
}

interface BooleanHabitConfig extends BaseHabitConfig {
    type: 'boolean';
    goodWhenTrue: boolean;
}

interface IntegerHabitConfig extends BaseHabitConfig {
    type: 'integer';
    min: number;
    max: number;
    goodWhenHigh: boolean;
}

interface StringHabitConfig extends BaseHabitConfig {
    type: 'string';
}

type HabitConfig = BooleanHabitConfig | IntegerHabitConfig | StringHabitConfig;

// Habit definitions with their types and meanings
const habits: Record<string, HabitConfig> = {
    // Boolean habits (good when true)
    'Meditation': { type: 'boolean', goodWhenTrue: true },
    'Exercise': { type: 'boolean', goodWhenTrue: true },
    'Healthy Meal': { type: 'boolean', goodWhenTrue: true },
    // Boolean habits (bad when true)
    'Junk Food': { type: 'boolean', goodWhenTrue: false },
    'Alcohol': { type: 'boolean', goodWhenTrue: false },
    
    // Integer habits (good when high)
    'Steps (thousands)': { type: 'integer', min: 0, max: 20, goodWhenHigh: true },
    'Water Glasses': { type: 'integer', min: 0, max: 12, goodWhenHigh: true },
    'Hours of Sleep': { type: 'integer', min: 3, max: 12, goodWhenHigh: true },
    
    // Random string (to be ignored)
    'Mood Notes': { type: 'string' },
};

function generateDayData(): Record<string, string> {
    const data: Record<string, string> = {};
    
    for (const [habit, config] of Object.entries(habits)) {
        if (random() > PROBABILITY_OF_DATA) {
            data[habit] = '';
            continue;
        }

        switch (config.type) {
            case 'boolean':
                // Generate more true values for good habits, more false for bad habits
                const baseProb = (config as BooleanHabitConfig).goodWhenTrue ? 0.7 : 0.3;
                data[habit] = random() < baseProb ? 'Yes' : 'No';
                break;
            
            case 'integer':
                const intConfig = config as IntegerHabitConfig;
                const value = Math.floor(random() * (intConfig.max - intConfig.min + 1) + intConfig.min);
                data[habit] = value.toString();
                break;
            
            case 'string':
                const moods = ['Happy 😊', 'Tired 😴', 'Energetic ⚡', 'Meh 😐', 'Great! 🌟'];
                data[habit] = moods[Math.floor(random() * moods.length)];
                break;
        }
    }
    
    return data;
}

function generateCSV(): void {
    const headers = ['Date', ...Object.keys(habits)];
    const rows: Record<string, string>[] = [];
    
    let currentDate = new Date(START_DATE);
    while (currentDate <= END_DATE) {
        const row: Record<string, string> = {
            Date: format(currentDate, 'yyyy-MM-dd'),
            ...generateDayData()
        };
        rows.push(row);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    
    // Convert to CSV
    const csvContent = [
        headers.join(','),
        ...rows.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    
    // Write to public directory so it can be served statically
    fs.writeFileSync(path.join(publicDir, 'sample-habits.csv'), csvContent);
    
    console.log('Sample data generated successfully at public/sample-habits.csv');
}

generateCSV();
