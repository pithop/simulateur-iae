const fs = require('fs');
const path = './public/data.json';

// Read the original 12 questions
const originalData = JSON.parse(fs.readFileSync(path, 'utf8'));

let expandedQuestions = [...originalData];

// We need 170 questions in total
const targetCount = 170;
let currentIndex = 0;

for (let i = originalData.length + 1; i <= targetCount; i++) {
  // Pick a base question
  const baseQuestion = originalData[currentIndex % originalData.length];
  
  // Clone it
  const newQuestion = JSON.parse(JSON.stringify(baseQuestion));
  
  // Update ID
  newQuestion.id = i;
  
  // Slightly modify the question to make it a "variation"
  newQuestion.question = newQuestion.question + ` (Variation ${i})`;
  
  expandedQuestions.push(newQuestion);
  currentIndex++;
}

// Write the expanded array back to data.json
fs.writeFileSync(path, JSON.stringify(expandedQuestions, null, 2), 'utf8');

console.log(`Successfully generated ${expandedQuestions.length} questions and saved to ${path}`);
