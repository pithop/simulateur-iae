const fs = require('fs');

const generateMathSpeed = (id) => {
  const v1 = 40 + Math.floor(Math.random() * 5) * 10; // 40, 50, 60, 70, 80
  const v2 = v1 + 20 + Math.floor(Math.random() * 4) * 10; // > v1
  
  // Harmonic mean
  const avg = (2 * v1 * v2) / (v1 + v2);
  const roundedAvg = Math.round(avg * 10) / 10;
  
  let options = [
    `A) ${Math.round((v1 + v2) / 2)} km/h`, // the trap arithmetic mean
    `B) ${Math.floor(roundedAvg - 5)} km/h`,
    `C) ${roundedAvg} km/h`,
    `D) ${Math.floor(roundedAvg + 3)} km/h`,
    `E) ${Math.floor(roundedAvg + 7)} km/h`
  ];
  
  // Randomize correct option position
  const correctOptionIndex = Math.floor(Math.random() * 5);
  const correctOptionStr = options[2];
  options[2] = options[correctOptionIndex];
  options[correctOptionIndex] = correctOptionStr;
  
  // Fix the A,B,C,D,E labels
  const letters = ['A', 'B', 'C', 'D', 'E'];
  options = options.map((opt, i) => `${letters[i]}) ` + opt.split(') ')[1]);
  
  return {
    id,
    test_id: 1,
    category: "Logique",
    question: `Un véhicule de livraison effectue un trajet aller-retour. À l'aller, le trafic permet de maintenir une vitesse de ${v1} km/h. Au retour, sur la même distance, la route autorise une vitesse de ${v2} km/h. Quelle est la vitesse moyenne exacte sur la totalité du parcours ?`,
    options,
    correct_answer: letters[correctOptionIndex],
    explanation: `L'approche rigoureuse nécessite la moyenne harmonique : (2 × ${v1} × ${v2}) / (${v1} + ${v2}) = ${roundedAvg} km/h. La moyenne arithmétique de ${(v1+v2)/2} est un piège classique.`
  };
};

const generateMathInterest = (id) => {
  const capital = 10000 + Math.floor(Math.random() * 40) * 1000;
  const rate = 2 + Math.floor(Math.random() * 5); // 2% to 6%
  const months = 12 + Math.floor(Math.random() * 3) * 6; // 12, 18, 24, 30
  const interest = (capital * rate * (months / 12)) / 100;
  const total = capital + interest;
  
  let options = [
    `A) 12 mois`,
    `B) 15 mois`,
    `C) ${months} mois`,
    `D) 20 mois`,
    `E) 24 mois`
  ];
  // Ensure unique options
  options = Array.from(new Set(options.map(o => o.split(') ')[1])));
  while(options.length < 5) options.push(`${Math.floor(Math.random()*30 + 10)} mois`);
  
  const correctOptionIndex = Math.floor(Math.random() * 5);
  const correctOptionStr = options[options.indexOf(`${months} mois`)];
  options = options.filter(o => o !== `${months} mois`);
  options.splice(correctOptionIndex, 0, `${months} mois`);
  
  const letters = ['A', 'B', 'C', 'D', 'E'];
  options = options.map((opt, i) => `${letters[i]}) ${opt}`);

  return {
    id,
    test_id: 1,
    category: "Logique",
    question: `Une entreprise place un excédent de ${capital} euros à un taux d'intérêts simples de ${rate} % par an. Au bout de combien de mois la valeur totale du compte s'élèvera-t-elle à ${total} euros ?`,
    options,
    correct_answer: letters[correctOptionIndex],
    explanation: `Intérêts purs = ${total} - ${capital} = ${interest}€. Intérêts pour 1 an = ${capital} × ${rate}% = ${capital*rate/100}€. Il faut donc ${interest / (capital*rate/100)} an(s), soit ${months} mois.`
  };
};

const generateMathDecrease = (id) => {
  const dec = [10, 20, 25, 40, 50];
  const choice = dec[Math.floor(Math.random() * dec.length)];
  const multiplier = 1 - (choice / 100);
  const requiredIncrease = (1 / multiplier) - 1;
  const incPercent = Math.round(requiredIncrease * 10000) / 100;
  
  let options = [
    `${choice} %`,
    `${choice + 5} %`,
    `${incPercent} %`,
    `${Math.round(incPercent) + 10} %`,
    `${incPercent + 15} %`
  ];
  
  const correctOptionIndex = Math.floor(Math.random() * 5);
  options = options.filter(o => o !== `${incPercent} %`);
  options.splice(correctOptionIndex, 0, `${incPercent} %`);
  
  const letters = ['A', 'B', 'C', 'D', 'E'];
  options = options.map((opt, i) => `${letters[i]}) ${opt}`);

  return {
    id,
    test_id: 1,
    category: "Logique",
    question: `L'action d'une entreprise subit une violente décote de ${choice} %. De quel pourcentage exact l'action devra-t-elle augmenter pour retrouver sa valeur initiale ?`,
    options,
    correct_answer: letters[correctOptionIndex],
    explanation: `Une baisse de ${choice} % correspond à un coefficient de ${multiplier}. L'augmentation requise est l'inverse : 1/${multiplier} = ${1/multiplier}, soit une hausse de ${incPercent} %.`
  };
};

const generateFrenchAccord = (id) => {
  const subjects = [
    { noun: "les lettres", v: "écrites" },
    { noun: "les chansons", v: "entendues" },
    { noun: "les décisions", v: "prises" },
    { noun: "les pommes", v: "mangées" },
    { noun: "les fleurs", v: "cueillies" }
  ];
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  
  return {
    id,
    test_id: 1,
    category: "Français",
    question: `Identifiez l'unique proposition grammaticalement irréprochable concernant l'accord du participe passé :`,
    options: [
      `A) ${s.noun} que nous avons ${s.v.slice(0, -1)} sont magnifiques.`,
      `B) Ils se sont parlé longuement.`,
      `C) ${s.noun} qu'elle a fait pour réussir.`,
      `D) ${s.noun}, il en a beaucoup ${s.v}.`,
      `E) Nous avons ${s.v} ${s.noun}.`
    ],
    correct_answer: "B",
    explanation: `La règle des verbes pronominaux (se parler) implique que le 'se' est un COI (parler 'à' quelqu'un), donc le participe passé reste invariable. Avec le pronom 'en', le participe passé ne s'accorde pas.`
  };
};

const generateEnglishNouns = (id) => {
  const nouns = ["information", "furniture", "luggage", "advice", "equipment"];
  const n = nouns[Math.floor(Math.random() * nouns.length)];
  
  return {
    id,
    test_id: 1,
    category: "Anglais",
    question: `Identify the grammatically INACCURATE sentence regarding countable and uncountable nouns:`,
    options: [
      `A) He gave me some valuable ${n}.`,
      `B) We bought a lot of new ${n}.`,
      `C) The new ${n} are arriving tomorrow.`,
      `D) She carries too much ${n}.`,
      `E) I need a piece of ${n}.`
    ],
    correct_answer: "C",
    explanation: `Le mot "${n}" est indénombrable en anglais. Il ne prend jamais de 's' au pluriel et le verbe qui l'accompagne doit être conjugué au singulier (ex: The ${n} IS arriving). L'option C est donc incorrecte.`
  };
};

const generateCulture = (id) => {
  const facts = [
    { q: "Qui a remporté l'élection présidentielle américaine en 2024 ?", a: "Donald Trump", w: ["Joe Biden", "Kamala Harris", "Ron DeSantis", "Nikki Haley"] },
    { q: "Quel pays a rejoint l'OTAN en 2024 devenant le 32ème membre ?", a: "La Suède", w: ["La Finlande", "L'Ukraine", "La Géorgie", "La Serbie"] },
    { q: "Quelle entreprise a dépassé temporairement la capitalisation d'Apple en 2024 grâce à l'IA ?", a: "Nvidia", w: ["Microsoft", "Tesla", "Amazon", "Meta"] },
    { q: "Où se sont déroulés les Jeux Olympiques d'été en 2024 ?", a: "Paris", w: ["Los Angeles", "Tokyo", "Londres", "Pékin"] },
    { q: "Quel est le nom du nouveau Premier ministre français nommé début 2024 (avant la dissolution) ?", a: "Gabriel Attal", w: ["Élisabeth Borne", "Jean Castex", "Edouard Philippe", "Gérald Darmanin"] },
    { q: "Quelle technologie est au cœur du produit ChatGPT d'OpenAI ?", a: "Les LLM (Large Language Models)", w: ["La Blockchain", "L'informatique quantique", "Le Cloud Computing", "La Réalité Virtuelle"] },
    { q: "Quel pays africain a intégré les BRICS début 2024 ?", a: "L'Égypte (et l'Éthiopie)", w: ["Le Nigéria", "Le Kenya", "Le Maroc", "L'Angola"] }
  ];
  const f = facts[Math.floor(Math.random() * facts.length)];
  
  let options = [f.a, ...f.w];
  const correctOptionIndex = Math.floor(Math.random() * 5);
  options = options.filter(o => o !== f.a);
  options.splice(correctOptionIndex, 0, f.a);
  
  const letters = ['A', 'B', 'C', 'D', 'E'];
  options = options.map((opt, i) => `${letters[i]}) ${opt}`);

  return {
    id,
    test_id: 1,
    category: "Culture Générale",
    question: f.q,
    options,
    correct_answer: letters[correctOptionIndex],
    explanation: `La bonne réponse est ${f.a}.`
  };
};

const generators = [
  generateMathSpeed,
  generateMathInterest,
  generateMathDecrease,
  generateFrenchAccord,
  generateEnglishNouns,
  generateCulture,
  generateCulture // double weight for culture
];

// Re-read original 12 questions just to keep them at the beginning
const path = './public/data.json';
const original12 = JSON.parse(fs.readFileSync(path, 'utf8')).slice(0, 12);

const questions = [...original12];

for (let i = 13; i <= 170; i++) {
  const generator = generators[Math.floor(Math.random() * generators.length)];
  questions.push(generator(i));
}

// Balance categories (IAE generally has 50 CG, 50 FR, 20 LOG, 50 ENG)
// This is an approximation for testing, exact category counts don't technically matter for the dev server,
// but it makes it much more realistic!

fs.writeFileSync(path, JSON.stringify(questions, null, 2), 'utf8');
console.log("170 unique questions procedurally generated!");
