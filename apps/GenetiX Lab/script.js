const { useState, useEffect, useMemo } = React;

/* =========================
   Firebase configuration
   ========================= */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* =========================
   Genetic code table
   ========================= */
const CODON_TABLE = {
  UUU: "Phe", UUC: "Phe", UUA: "Leu", UUG: "Leu",
  UCU: "Ser", UCC: "Ser", UCA: "Ser", UCG: "Ser",
  UAA: "STOP", UAG: "STOP", UGA: "STOP",
  AUG: "Met (Start)",
  GCU: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",
};

/* =========================
   Scenarios (rút gọn mẫu)
   ========================= */
const SCENARIOS = {
  group1: {
    name: "Nhóm 1",
    disease: "Hồng cầu hình liềm",
    gene: "HBB",
    dna: "GTGCACCTGACTCCTGAGGAGAAG",
    hint: "Thay A → T tại vị trí 17",
    defaultType: "substitution",
  },
};

/* =========================
   Utilities
   ========================= */
const dnaToMrna = (dna) => dna.replace(/T/g, "U");

const translate = (mrna) => {
  const result = [];
  for (let i = 0; i < mrna.length; i += 3) {
    result.push(CODON_TABLE[mrna.slice(i, i + 3)] || "???");
  }
  return result;
};

/* =========================
   Main App
   ========================= */
function App() {
  const [joined, setJoined] = useState(false);
  const [dna, setDna] = useState(SCENARIOS.group1.dna);

  const mrna = dnaToMrna(dna);
  const protein = translate(mrna);

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-3xl font-black mb-4">🧬 GenetiX Lab</h1>
          <p className="mb-6 text-slate-500">
            Mô phỏng đột biến gen và bệnh di truyền ở người
          </p>
          <button
            onClick={() => setJoined(true)}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold"
          >
            Bắt đầu thực hành
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black mb-6">
        {SCENARIOS.group1.disease}
      </h2>

      <div className="mb-6">
        <strong>DNA:</strong>
        <div className="font-mono mt-2">{dna}</div>
      </div>

      <div className="mb-6">
        <strong>mRNA:</strong>
        <div className="font-mono mt-2">{mrna}</div>
      </div>

      <div>
        <strong>Protein:</strong>
        <div className="flex gap-2 mt-2 flex-wrap">
          {protein.map((aa, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-800 text-white rounded-xl text-sm"
            >
              {aa}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Render
   ========================= */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

