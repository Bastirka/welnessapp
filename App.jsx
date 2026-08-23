import React, { useState, useEffect } from "react";
import WorkoutTab from "./src/WorkoutTab.jsx";
import { Leaf, Footprints, Moon, Droplets, Apple, Dumbbell, ChevronRight, Check, Sparkles, Sunrise, Sun, Sunset, Cookie, Clock } from "lucide-react";

// Design tokens
// Color: sage #7A8B6F, deep moss #4A5540, warm sand #EDE6D6, terracotta-clay #C97D5D (sparingly), ink #2E2B26, cream paper #FAF7F0
// Type: display = "Fraunces" (serif, warm, editorial) / body = "Inter" / utility = "IBM Plex Mono" for small labels
// Layout: single calm column, generous whitespace, a "week ribbon" as the signature element

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

const PACE_OPTIONS = [
  { id: "gentle", label: "Медленно и стабильно", weeks: "несколько месяцев", note: "Рекомендуемый темп для большинства — легче удержать надолго." },
  { id: "steady", label: "Средний темп", weeks: "2–4 месяца", note: "Требует последовательности, но всё ещё бережный к телу." },
];

const HABIT_LIBRARY = [
  { id: "walk", icon: Footprints, title: "10-минутная прогулка", tag: "движение" },
  { id: "water", icon: Droplets, title: "Стакан воды после пробуждения", tag: "рутина" },
  { id: "veg", icon: Apple, title: "Порция овощей к каждому приёму пищи", tag: "питание" },
  { id: "sleep", icon: Moon, title: "Отход ко сну в одно и то же время", tag: "отдых" },
  { id: "stretch", icon: Dumbbell, title: "5-минутная растяжка", tag: "движение" },
];

const MEAL_SECTIONS = [
  {
    id: "breakfast",
    label: "Завтрак",
    icon: Sunrise,
    meals: [
      {
        title: "Овсянка с ягодами",
        time: "5 min",
        desc: "Овсяные хлопья с горячим молоком или водой, горсть замороженных ягод, немного мёда.",
        illustration: "oatmeal",
      },
      {
        title: "Яичница с овощами",
        time: "7 min",
        desc: "Взбитые яйца с сезонными овощами, слегка обжаренные на сковороде.",
        illustration: "eggs",
      },
      {
        title: "Греческий йогурт с орехами",
        time: "2 min",
        desc: "Йогурт, горсть орехов, свежие кусочки фруктов сверху.",
        illustration: "yogurt",
      },
    ],
  },
  {
    id: "lunch",
    label: "Обед",
    icon: Sun,
    meals: [
      {
        title: "Курица с рисом и овощами",
        time: "15 min",
        desc: "Обжаренное куриное филе, овощи на пару, цельнозерновой рис.",
        illustration: "chickenrice",
      },
      {
        title: "Салат с тунцом",
        time: "10 min",
        desc: "Тунец, свежие овощи, лёгкая заправка, цельнозерновой хлеб к салату.",
        illustration: "salad",
      },
      {
        title: "Омлет с ветчиной и сыром",
        time: "10 min",
        desc: "Яйца, кусочки ветчины, тёртый сыр, свежие помидоры рядом.",
        illustration: "omelette",
      },
    ],
  },
  {
    id: "dinner",
    label: "Ужин",
    icon: Sunset,
    meals: [
      {
        title: "Запечённая рыба с овощами",
        time: "20 min",
        desc: "Лосось или треска в духовке с сезонными овощами и оливковым маслом.",
        illustration: "fish",
      },
      {
        title: "Творог со свежими овощами",
        time: "7 min",
        desc: "Творог, огурец, редис, зелень — лёгкий и быстрый вариант.",
        illustration: "cottage",
      },
      {
        title: "Гречка с курицей и грибами",
        time: "20 min",
        desc: "Всё в одной кастрюле — гречка, курица, грибы, медленно тушёные.",
        illustration: "buckwheat",
      },
    ],
  },
  {
    id: "snacks",
    label: "Перекусы",
    icon: Cookie,
    meals: [
      {
        title: "Свежий фрукт",
        time: "1 min",
        desc: "Яблоко, груша или апельсин — удобный перекус в любой момент.",
        illustration: "fruit",
      },
      {
        title: "Горсть орехов",
        time: "1 min",
        desc: "Миндаль или грецкие орехи — сытно и удобно брать с собой.",
        illustration: "nuts",
      },
      {
        title: "Варёное яйцо",
        time: "1 min",
        desc: "Приготовь заранее — хороший перекус между приёмами пищи.",
        illustration: "egg",
      },
    ],
  },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, background: "#4A5540",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <Leaf size={18} color="#EDE6D6" strokeWidth={2} />
      </div>
      <span style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: "#2E2B26", letterSpacing: "-0.01em" }}>
        Zarins
      </span>
    </div>
  );
}

function WeekRibbon({ activeDays }) {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {days.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#8A8474", letterSpacing: "0.05em" }}>{d}</span>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: activeDays.includes(i) ? "#7A8B6F" : "#EDE6D6",
            border: activeDays.includes(i) ? "none" : "1.5px solid #DCD5C4",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {activeDays.includes(i) && <Check size={14} color="#FAF7F0" strokeWidth={3} />}
          </div>
        </div>
      ))}
    </div>
  );
}

const MEAL_IMAGES = {
  oatmeal:    "/edieni/01_auzu_parslas_ar_ogam.jpg",
  eggs:       "/edieni/02_olu_kultenis_ar_darzeniem.jpg",
  yogurt:     "/edieni/03_grieku_jogurts_ar_riekstiem.jpg",
  chickenrice:"/edieni/04_vista_ar_risiem_un_darzeniem.jpg",
  salad:      "/edieni/05_tunca_salati.jpg",
  omelette:   "/edieni/06_omlete_ar_skinki_un_sieru.jpg",
  fish:       "/edieni/07_cepta_zivs_ar_darzeniem.jpg",
  cottage:    "/edieni/08_biezpiens_ar_svaigiem_darzeniem.jpg",
  buckwheat:  "/edieni/09_griki_ar_vistu_un_senem.jpg",
  fruit:      "/edieni/10_svaigs_auglis.jpg",
  nuts:       "/edieni/11_sauja_riekstu.jpg",
  egg:        "/edieni/12_varita_ola.jpg",
};

// Hand-drawn-style flat SVG illustrations for each meal — no external
// image dependency, so nothing can fail to load.
const PALETTE = {
  sage: "#7A8B6F", moss: "#4A5540", sand: "#EDE6D6", clay: "#C97D5D",
  cream: "#FAF7F0", berry: "#8E4A5E", yolk: "#E8B44A", leaf: "#5C7A4E",
};

function FoodIllustration({ variant }) {
  const common = { width: "100%", height: "100%", viewBox: "0 0 200 140" };

  switch (variant) {
    case "oatmeal":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <ellipse cx="100" cy="78" rx="52" ry="32" fill="#fff" />
          <ellipse cx="100" cy="72" rx="52" ry="26" fill="#F3E6C8" />
          <circle cx="82" cy="66" r="5" fill={PALETTE.berry} />
          <circle cx="104" cy="60" r="5" fill={PALETTE.berry} />
          <circle cx="118" cy="70" r="4" fill={PALETTE.berry} />
          <circle cx="94" cy="74" r="4" fill="#5C3A2E" />
          <path d="M56 78 Q100 100 144 78" stroke={PALETTE.moss} strokeWidth="3" fill="none" opacity="0.3" />
        </svg>
      );
    case "eggs":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <path d="M78 60 Q95 45 118 58 Q130 68 116 82 Q98 92 82 78 Q70 68 78 60Z" fill={PALETTE.yolk} />
          <circle cx="60" cy="50" r="7" fill={PALETTE.leaf} />
          <circle cx="140" cy="55" r="6" fill={PALETTE.clay} />
          <circle cx="55" cy="90" r="5" fill={PALETTE.leaf} />
        </svg>
      );
    case "yogurt":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <path d="M75 40h50l6 60a28 28 0 0 1-62 0z" fill="#fff" />
          <path d="M75 40h50l3 30H72z" fill="#F7F0DE" />
          <circle cx="88" cy="80" r="4" fill="#8B6A4A" />
          <circle cx="104" cy="88" r="4" fill="#8B6A4A" />
          <circle cx="116" cy="76" r="4" fill="#8B6A4A" />
          <circle cx="96" cy="70" r="3.5" fill={PALETTE.clay} />
        </svg>
      );
    case "chickenrice":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <ellipse cx="72" cy="72" rx="20" ry="16" fill="#F0E8D0" />
          <ellipse cx="120" cy="58" rx="22" ry="14" fill="#C98650" />
          <ellipse cx="122" cy="90" rx="16" ry="12" fill={PALETTE.leaf} />
        </svg>
      );
    case "salad":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <path d="M62 60 Q100 40 138 60 Q120 80 100 72 Q80 80 62 60Z" fill={PALETTE.leaf} />
          <circle cx="90" cy="88" r="8" fill={PALETTE.clay} />
          <circle cx="112" cy="90" r="7" fill="#D98A5E" />
          <rect x="70" y="95" width="60" height="8" rx="4" fill="#E8DCC0" />
        </svg>
      );
    case "omelette":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <ellipse cx="100" cy="72" rx="34" ry="22" fill={PALETTE.yolk} />
          <circle cx="88" cy="66" r="5" fill="#D98A5E" />
          <circle cx="110" cy="78" r="5" fill="#D98A5E" />
          <circle cx="100" cy="60" r="4" fill="#fff" opacity="0.7" />
        </svg>
      );
    case "fish":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <ellipse cx="100" cy="72" rx="36" ry="18" fill="#D98263" />
          <path d="M88 66 L112 66 M86 72 L114 72 M88 78 L112 78" stroke="#B85F45" strokeWidth="2.5" />
          <circle cx="65" cy="55" r="6" fill={PALETTE.leaf} />
          <circle cx="135" cy="88" r="5" fill={PALETTE.leaf} />
        </svg>
      );
    case "cottage":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <ellipse cx="94" cy="70" rx="30" ry="20" fill="#FBF6E8" />
          <circle cx="80" cy="62" r="4" fill="#F0E6C8" />
          <circle cx="100" cy="58" r="4" fill="#F0E6C8" />
          <circle cx="92" cy="78" r="4" fill="#F0E6C8" />
          <circle cx="130" cy="82" r="10" fill={PALETTE.leaf} />
          <circle cx="118" cy="60" r="7" fill="#C0453F" />
        </svg>
      );
    case "buckwheat":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="72" r="46" fill="#fff" />
          <ellipse cx="100" cy="76" rx="34" ry="18" fill="#8C6A4A" />
          <ellipse cx="126" cy="60" rx="18" ry="12" fill="#C98650" />
          <circle cx="76" cy="60" r="6" fill={PALETTE.sand} />
          <circle cx="88" cy="54" r="5" fill={PALETTE.sand} />
        </svg>
      );
    case "fruit":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="82" cy="72" r="26" fill="#C0453F" />
          <circle cx="130" cy="78" r="22" fill={PALETTE.yolk} />
          <rect x="79" y="42" width="6" height="12" rx="3" fill={PALETTE.leaf} />
          <ellipse cx="90" cy="46" rx="8" ry="5" fill={PALETTE.leaf} />
        </svg>
      );
    case "nuts":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <ellipse cx="80" cy="76" rx="18" ry="22" fill="#B08356" />
          <ellipse cx="112" cy="66" rx="16" ry="20" fill="#C99B6A" />
          <ellipse cx="128" cy="88" rx="14" ry="17" fill="#A6794C" />
          <path d="M80 60 v8 M112 48 v8" stroke="#7A5A38" strokeWidth="2" />
        </svg>
      );
    case "egg":
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <ellipse cx="100" cy="74" rx="26" ry="34" fill="#fff" />
          <ellipse cx="100" cy="74" rx="26" ry="34" fill="none" stroke="#EAD9B8" strokeWidth="1.5" />
          <path d="M84 70 L96 82 L118 58" stroke={PALETTE.sage} strokeWidth="0" fill="none" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="200" height="140" fill={PALETTE.sand} />
          <circle cx="100" cy="70" r="30" fill={PALETTE.sage} opacity="0.3" />
        </svg>
      );
  }
}

function MealCard({ meal }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = MEAL_IMAGES[meal.illustration];
  return (
    <div style={{
      borderRadius: 16, overflow: "hidden", border: "1.5px solid #DCD5C4", background: "#FFFFFF"
    }}>
      <div style={{ width: "100%", height: 140, background: "#EDE6D6", position: "relative" }}>
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={meal.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <FoodIllustration variant={meal.illustration} />
        )}
        <div style={{
          position: "absolute", top: 10, right: 10, background: "rgba(46,43,38,0.75)",
          borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4
        }}>
          <Clock size={11} color="#FAF7F0" />
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: "#FAF7F0" }}>{meal.time}</span>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, fontWeight: 600, color: "#2E2B26" }}>{meal.title}</div>
        <p style={{ fontSize: 13, color: "#5C5647", marginTop: 5, lineHeight: 1.5 }}>{meal.desc}</p>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const linkTag = <link rel="stylesheet" href={FONT_LINK} />;
  const containerStyle = {
    minHeight: "100vh", background: "#FAF7F0", fontFamily: "Inter, sans-serif",
    color: "#2E2B26", display: "flex", justifyContent: "center", padding: "32px 20px",
  };
  return (
    <div style={containerStyle}>
      {linkTag}
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Logo />
        <div style={{ marginTop: 56 }}>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#7A8B6F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Добро пожаловать
          </span>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 34, lineHeight: 1.15, margin: "16px 0 0", color: "#2E2B26" }}>
            Как тебя зовут?
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5C5647", marginTop: 14 }}>
            Твоё имя используется только локально, чтобы сохранить твой прогресс на этом устройстве.
          </p>
        </div>
        <div style={{ marginTop: 32 }}>
          <input
            type="text"
            placeholder="Твоё имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && onLogin(name.trim())}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #DCD5C4",
              background: "#FFFFFF", fontFamily: "Inter, sans-serif", fontSize: 15, color: "#2E2B26",
              outline: "none", boxSizing: "border-box",
            }}
            autoFocus
          />
        </div>
        <button
          onClick={() => name.trim() && onLogin(name.trim())}
          disabled={!name.trim()}
          style={{
            marginTop: 16, width: "100%", padding: "15px 20px", borderRadius: 14,
            background: name.trim() ? "#4A5540" : "#DCD5C4", color: "#FAF7F0", border: "none",
            fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            cursor: name.trim() ? "pointer" : "not-allowed",
          }}
        >
          Продолжить <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("zarins_user")); } catch { return null; }
  });
  const [step, setStep] = useState("intro");
  const [pace, setPace] = useState(null);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [checkedToday, setCheckedToday] = useState([]);
  const [activeDays, setActiveDays] = useState([]);
  const [dashTab, setDashTab] = useState("habits");
  const [mealSection, setMealSection] = useState("breakfast");

  // Load saved profile when user is set
  useEffect(() => {
    if (!user) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`zarins_profile_${user.name}`));
      if (saved) {
        if (saved.step) setStep(saved.step);
        if (saved.pace) setPace(saved.pace);
        if (saved.selectedHabits) setSelectedHabits(saved.selectedHabits);
        if (saved.checkedToday) setCheckedToday(saved.checkedToday);
        if (saved.activeDays) setActiveDays(saved.activeDays);
      }
    } catch {}
  }, [user?.name]);

  // Save profile on every state change
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`zarins_profile_${user.name}`, JSON.stringify({
      step, pace, selectedHabits, checkedToday, activeDays,
    }));
  }, [user, step, pace, selectedHabits, checkedToday, activeDays]);

  const handleLogin = (name) => {
    const u = { name };
    localStorage.setItem("zarins_user", JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("zarins_user");
    setUser(null);
    setStep("intro");
    setPace(null);
    setSelectedHabits([]);
    setCheckedToday([]);
    setActiveDays([]);
  };

  const linkTag = <link rel="stylesheet" href={FONT_LINK} />;

  const toggleHabit = (id) => {
    setSelectedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleToday = (id) => {
    setCheckedToday((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "#FAF7F0",
    fontFamily: "Inter, sans-serif",
    color: "#2E2B26",
    display: "flex",
    justifyContent: "center",
    padding: "32px 20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 420,
  };

  // ---------- AUTH ----------
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ---------- INTRO ----------
  if (step === "intro") {
    return (
      <div style={containerStyle}>
        {linkTag}
        <div style={cardStyle}>
          <Logo />
          <div style={{ marginTop: 56 }}>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#7A8B6F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Повседневные привычки, а не цифры
            </span>
            <h1 style={{
              fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 38, lineHeight: 1.15,
              margin: "16px 0 0", color: "#2E2B26"
            }}>
              Маленькие шаги, которые остаются.
            </h1>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#5C5647", marginTop: 18 }}>
              Zarins помогает формировать полезные повседневные привычки в своём темпе —
              без подсчёта калорий и без давления. Мы следим за
              привычками, а не за весом.
            </p>
          </div>

          <div style={{
            marginTop: 40, padding: "16px 18px", background: "#EDE6D6",
            borderRadius: 14, display: "flex", gap: 12, alignItems: "flex-start"
          }}>
            <Sparkles size={18} color="#7A8B6F" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#4A5540", margin: 0 }}>
              Это приложение не даёт медицинских рекомендаций. Перед серьёзными
              изменениями в питании или активности проконсультируйся с врачом
              или диетологом — особенно при наличии проблем со здоровьем.
            </p>
          </div>

          <button
            onClick={() => setStep("pace")}
            style={{
              marginTop: 32, width: "100%", padding: "15px 20px", borderRadius: 14,
              background: "#4A5540", color: "#FAF7F0", border: "none",
              fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: "pointer"
            }}
          >
            Начать <ChevronRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  // ---------- PACE ----------
  if (step === "pace") {
    return (
      <div style={containerStyle}>
        {linkTag}
        <div style={cardStyle}>
          <Logo />
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 500, marginTop: 40 }}>
            В каком темпе ты хочешь идти?
          </h2>
          <p style={{ fontSize: 14.5, color: "#5C5647", lineHeight: 1.6, marginTop: 8 }}>
            Более медленный темп обычно означает больше шансов удержать результат
            надолго. Здесь нет «быстрого» варианта — и это осознанно.
          </p>

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {PACE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPace(opt.id)}
                style={{
                  textAlign: "left", padding: "18px 20px", borderRadius: 16,
                  border: pace === opt.id ? "2px solid #7A8B6F" : "1.5px solid #DCD5C4",
                  background: pace === opt.id ? "#EDE6D6" : "#FFFFFF",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: 17, fontWeight: 600 }}>{opt.label}</span>
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#8A8474" }}>{opt.weeks}</span>
                </div>
                <p style={{ fontSize: 13.5, color: "#5C5647", marginTop: 6, lineHeight: 1.5 }}>{opt.note}</p>
              </button>
            ))}
          </div>

          <button
            disabled={!pace}
            onClick={() => setStep("habits")}
            style={{
              marginTop: 32, width: "100%", padding: "15px 20px", borderRadius: 14,
              background: pace ? "#4A5540" : "#DCD5C4", color: "#FAF7F0", border: "none",
              fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: pace ? "pointer" : "not-allowed"
            }}
          >
            Далее <ChevronRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  // ---------- HABITS ----------
  if (step === "habits") {
    return (
      <div style={containerStyle}>
        {linkTag}
        <div style={cardStyle}>
          <Logo />
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 500, marginTop: 40 }}>
            Выбери 2–3 привычки
          </h2>
          <p style={{ fontSize: 14.5, color: "#5C5647", lineHeight: 1.6, marginTop: 8 }}>
            Начни с малого. Когда это станет привычкой, можно добавить ещё.
          </p>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {HABIT_LIBRARY.map((h) => {
              const Icon = h.icon;
              const selected = selectedHabits.includes(h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => toggleHabit(h.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 14,
                    border: selected ? "2px solid #7A8B6F" : "1.5px solid #DCD5C4",
                    background: selected ? "#EDE6D6" : "#FFFFFF", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: selected ? "#7A8B6F" : "#F3EFE4",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <Icon size={18} color={selected ? "#FAF7F0" : "#7A8B6F"} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{h.title}</div>
                    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: "#8A8474", marginTop: 2 }}>{h.tag}</div>
                  </div>
                  {selected && <Check size={18} color="#4A5540" />}
                </button>
              );
            })}
          </div>

          <button
            disabled={selectedHabits.length === 0}
            onClick={() => setStep("dashboard")}
            style={{
              marginTop: 28, width: "100%", padding: "15px 20px", borderRadius: 14,
              background: selectedHabits.length ? "#4A5540" : "#DCD5C4", color: "#FAF7F0", border: "none",
              fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: selectedHabits.length ? "pointer" : "not-allowed"
            }}
          >
            Начать отслеживать <ChevronRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  const chosen = HABIT_LIBRARY.filter((h) => selectedHabits.includes(h.id));
  const paceLabel = PACE_OPTIONS.find((p) => p.id === pace)?.label;

  return (
    <div style={containerStyle}>
      {linkTag}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: "#7A8B6F",
              background: "#EDE6D6", padding: "5px 10px", borderRadius: 20
            }}>
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              title="Выйти"
              style={{
                background: "none", border: "1.5px solid #DCD5C4", borderRadius: 8,
                padding: "5px 10px", cursor: "pointer",
                fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: "#8A8474",
              }}
            >
              Выйти
            </button>
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#8A8474", letterSpacing: "0.05em" }}>
            ЭТА НЕДЕЛЯ
          </span>
          <div style={{ marginTop: 12 }}>
            <WeekRibbon activeDays={activeDays} />
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{
          marginTop: 32, display: "flex", background: "#EDE6D6", borderRadius: 12, padding: 4, gap: 4
        }}>
          {[
            { id: "habits",  label: "Ieradumi" },
            { id: "meals",   label: "Ēdieni" },
            { id: "workout", label: "Treniņi" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setDashTab(tab.id)}
              style={{
                flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
                background: dashTab === tab.id ? "#FFFFFF" : "transparent",
                fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600,
                color: dashTab === tab.id ? "#2E2B26" : "#8A8474",
                boxShadow: dashTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {dashTab === "habits" ? (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600 }}>Сегодня</h3>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {chosen.map((h) => {
                const Icon = h.icon;
                const done = checkedToday.includes(h.id);
                return (
                  <button
                    key={h.id}
                    onClick={() => toggleToday(h.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 14,
                      border: "1.5px solid " + (done ? "#7A8B6F" : "#DCD5C4"),
                      background: done ? "#F3F5EF" : "#FFFFFF", cursor: "pointer", textAlign: "left",
                      transition: "background 0.15s"
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, background: done ? "#7A8B6F" : "#F3EFE4",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <Icon size={18} color={done ? "#FAF7F0" : "#7A8B6F"} />
                    </div>
                    <span style={{
                      flex: 1, fontSize: 14.5, fontWeight: 500,
                      textDecoration: done ? "line-through" : "none",
                      color: done ? "#8A8474" : "#2E2B26"
                    }}>
                      {h.title}
                    </span>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      border: done ? "none" : "1.5px solid #DCD5C4",
                      background: done ? "#4A5540" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {done && <Check size={13} color="#FAF7F0" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{
              marginTop: 24, padding: "18px 20px", background: "#2E2B26", borderRadius: 16,
            }}>
              <p style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, color: "#EDE6D6", lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>
                «Прогресс — это последовательность, а не идеальность. Один пропущенный
                день ничего не значит — важно то, что ты сделаешь завтра».
              </p>
            </div>
          </div>
        ) : dashTab === "meals" ? (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600 }}>Идеи блюд</h3>
            <p style={{ fontSize: 13, color: "#5C5647", marginTop: 4, lineHeight: 1.5 }}>
              Вдохновение, а не правила — выбирай то, что подходит тебе сегодня.
            </p>

            <div style={{ marginTop: 16, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {MEAL_SECTIONS.map((s) => {
                const Icon = s.icon;
                const active = mealSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setMealSection(s.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                      padding: "8px 14px", borderRadius: 20,
                      border: active ? "none" : "1.5px solid #DCD5C4",
                      background: active ? "#4A5540" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <Icon size={14} color={active ? "#FAF7F0" : "#7A8B6F"} />
                    <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600,
                      color: active ? "#FAF7F0" : "#5C5647"
                    }}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              {MEAL_SECTIONS.find((s) => s.id === mealSection).meals.map((meal, i) => (
                <MealCard key={i} meal={meal} />
              ))}
            </div>
          </div>
        ) : dashTab === "workout" ? <WorkoutTab /> : null}

        <div style={{
          marginTop: 20, padding: "14px 16px", background: "#EDE6D6", borderRadius: 12,
          display: "flex", gap: 10, alignItems: "flex-start"
        }}>
          <Sparkles size={16} color="#7A8B6F" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#4A5540", margin: 0 }}>
            Если замечаешь, что мысли о еде или внешности начинают занимать
            большую часть дня — стоит обсудить это с врачом или специалистом.
          </p>
        </div>
      </div>
    </div>
  );
}
