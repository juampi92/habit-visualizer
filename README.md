# Habit Visualizer

A powerful tool for visualizing your habits and tracking data over time, inspired by GitHub's contribution graph.

![Weekly Calendar Visualization](https://via.placeholder.com/800x400?text=Habit+Visualizer+Screenshot)

## Overview

Habit Visualizer is a web application that generates visual weekly calendars from your CSV tracking data. It transforms your habit and tracking logs into beautiful, color-coded grids that display patterns over time. This makes it easy to:

- Visualize consistency in your habits and routines
- Identify patterns and trends in your behavior
- Track progress towards your goals
- Celebrate your wins and identify areas for improvement

The intuitive heatmap format helps you quickly understand your data at a glance, with customizable color schemes to match your goals and preferences.

## Use Cases

### Perfect For:

- **Habit Tracking**: Visualize daily habits like meditation, exercise, reading, or journaling
- **Health Monitoring**: Track sleep quality, steps taken, calories burned, or water intake
- **Productivity Tracking**: Monitor work hours, tasks completed, or pomodoro sessions
- **Learning Goals**: Track study sessions, books read, or skills practiced
- **Financial Goals**: Monitor spending habits, savings contributions, or budget adherence
- **Wellness Metrics**: View mood scores, stress levels, or symptom tracking
- **Custom Metrics**: Any numerical or boolean (yes/no) data collected over time

### Example Scenarios:

- A runner tracking daily mileage, seeing their consistency build up over months
- A developer tracking GitHub contributions alongside personal coding projects
- A meditator visualizing their daily practice length and consistency
- A student tracking study hours across different subjects
- Someone in recovery tracking days sober or symptom-free
- A writer tracking daily word count or writing session duration

## Data Format

Habit Visualizer accepts CSV (Comma-Separated Values) files with the following specifications:

### Required Format:

- One column must contain **dates** (the app will automatically detect common date formats)
- At least one column must contain either:
  - **Boolean values** (yes/no, true/false, 1/0)
  - **Numeric values** (any numerical data)

### Example CSV Structure:

```csv
Date,Meditation,Exercise,Sleep_Hours,Mood
2023-01-01,yes,yes,7.5,8
2023-01-02,yes,no,6.2,7
2023-01-03,no,yes,8,9
...
```

The app will automatically detect which columns can be visualized and allow you to select the specific metric you want to focus on.

## Customization Options

Habit Visualizer allows you to:

- Select any boolean or numeric field in your data for visualization
- Choose between color palettes:
  - "High values are good" (red to green): For metrics where higher is better (exercise minutes, books read)
  - "Low values are good" (green to red): For metrics where lower is better (stress levels, expenses)
- Set the maximum value for proper color scaling
- Toggle the configuration panel to focus on your visualization

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Tips

1. **Prepare your CSV file** with at least one date column and metrics you want to track
2. **Upload the file** using the built-in uploader
3. **Select the field** you want to visualize from the dropdown menu
4. **Customize the colors** based on whether high or low values are good for your metric
5. **Adjust the max value** if needed to properly scale the colors
6. **Explore the visualization** - hover over boxes to see exact values and date ranges

## Technical Details

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses modern React patterns and the latest Next.js features for optimal performance and user experience.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.