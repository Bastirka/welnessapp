import React, { useState } from "react";
import { Dumbbell, ChevronDown, ChevronUp, Check, Flame, Clock } from "lucide-react";

const WARMUP_EXERCISES = [
  { id: "w1", name: "Ходьба на месте или лёгкий бег", reps: "3 минуты" },
  { id: "w2", name: "Круговые вращения руками и плечами", reps: "10 в каждую сторону" },
  { id: "w3", name: "Наклоны корпуса в стороны", reps: "10 повторов" },
  { id: "w4", name: "Вращения тазом", reps: "10 в каждую сторону" },
  { id: "w5", name: "Приседания без веса (медленно)", reps: "10–15 повторов" },
  { id: "w6", name: "Выпады на месте", reps: "8–10 на ногу" },
];

const WORKOUT_COMPLEXES = [
  {
    id: "glutes",
    title: "Ягодицы и бёдра",
    freq: "2–3 × в неделю",
    accent: "#C97D5D",
    exercises: [
      { name: "Приседания классические",                    sets: 3, reps: "15–20",           rest: "45–60 сек", tip: "Колени не выходят за носки" },
      { name: "Ягодичный мостик",                           sets: 3, reps: "15–20",           rest: "45 сек",    tip: "Задержка вверху 1–2 сек" },
      { name: "Выпады вперёд",                              sets: 3, reps: "12 на ногу",      rest: "45–60 сек", tip: "Можно с гантелями" },
      { name: "Приседания сумо (плие)",                     sets: 3, reps: "15",              rest: "45 сек",    tip: "Стопы шире плеч, носки наружу" },
      { name: "Отведение ноги назад (стоя на четвереньках)",sets: 3, reps: "15 на ногу",      rest: "30–45 сек", tip: "Медленно, без рывков" },
      { name: "Румынская тяга",                             sets: 3, reps: "12–15",           rest: "60 сек",    tip: "Спина прямая, отвод таза назад" },
      { name: "Ходьба в полуприседе с резинкой",            sets: 3, reps: "20 шагов",        rest: "30–45 сек", tip: "Опционально — при наличии резинки" },
    ],
  },
  {
    id: "waist",
    title: "Талия и живот",
    freq: "3–4 × в неделю",
    accent: "#7A8B6F",
    exercises: [
      { name: "Планка классическая",               sets: 3, reps: "30–45 сек",           rest: "30–45 сек", tip: "Тело — прямая линия" },
      { name: "Скручивания на пресс",              sets: 3, reps: "15–20",               rest: "30–45 сек", tip: "Не тянуть шею руками" },
      { name: "Боковая планка",                    sets: 3, reps: "20–30 сек / сторону", rest: "30 сек",    tip: "Держать таз ровно" },
      { name: "«Велосипед» (локти к колену)",      sets: 3, reps: "20 (по 10/сторону)",  rest: "30–45 сек", tip: "Медленный контролируемый темп" },
      { name: "Подъём ног лёжа",                   sets: 3, reps: "12–15",               rest: "45 сек",    tip: "Поясница прижата к полу" },
      { name: "Русские скручивания",               sets: 3, reps: "20",                  rest: "30–45 сек", tip: "Можно с лёгким весом" },
      { name: "Вакуум живота (втягивание)",        sets: 3, reps: "15–20 сек",           rest: "30 сек",    tip: "Выполнять на выдохе" },
    ],
  },
  {
    id: "chest",
    title: "Грудь",
    freq: "2 × в неделю",
    accent: "#4A5540",
    exercises: [
      { name: "Отжимания от пола (классические)",          sets: 3, reps: "8–15",  rest: "60 сек",    tip: "Можно с колен при слабой подготовке" },
      { name: "Отжимания от скамьи/дивана (наклонные)",    sets: 3, reps: "10–12", rest: "45–60 сек", tip: "Руки чуть шире плеч" },
      { name: "Жим гантелей лёжа",                         sets: 3, reps: "10–12", rest: "60 сек",    tip: "При наличии инвентаря" },
      { name: "Разведение рук с гантелями лёжа",           sets: 3, reps: "12–15", rest: "45 сек",    tip: "Лёгкий вес, контроль амплитуды" },
      { name: "«Молитва» (сведение ладоней перед грудью)", sets: 3, reps: "15–20", rest: "30 сек",    tip: "Статическое напряжение груди" },
      { name: "Отжимания узким хватом (трицепс + грудь)",  sets: 3, reps: "8–12",  rest: "60 сек",    tip: "Локти ближе к корпусу" },
    ],
  },
];

// index 0 = воскресенье (JS getDay())
const WEEKLY_SCHEDULE = [
  { label: "Полный отдых",                    complexIds: [],                  rest: true },
  { label: "Ягодицы и бёдра",                complexIds: ["glutes"],          rest: false },
  { label: "Живот и талия + кардио",          complexIds: ["waist"],           rest: false },
  { label: "Отдых или растяжка",              complexIds: [],                  rest: true },
  { label: "Грудь",                           complexIds: ["chest"],           rest: false },
  { label: "Ягодицы и бёдра + живот (комбо)",complexIds: ["glutes", "waist"], rest: false },
  { label: "Кардио — ходьба, велосипед",      complexIds: [],                  rest: true },
];

const DAY_NAMES = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function WarmupCard({ warmupDone, onToggle, open, onOpenToggle }) {
  const allDone = WARMUP_EXERCISES.every(e => warmupDone[e.id]);
  return (
    <div style={{ border: "1.5px solid " + (allDone ? "#7A8B6F" : "#DCD5C4"), borderRadius: 14, overflow: "hidden", background: "#FFFFFF" }}>
      <button
        onClick={onOpenToggle}
        style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: allDone ? "#4A5540" : "#FFF3EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {allDone ? <Check size={17} color="#FAF7F0" strokeWidth={2.5} /> : <Flame size={17} color="#C97D5D" />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, fontWeight: 600, color: "#2E2B26" }}>Разминка</div>
          <div style={{ fontSize: 11.5, color: "#8A8474", marginTop: 2, fontFamily: "IBM Plex Mono, monospace" }}>обязательно перед тренировкой</div>
        </div>
        {open ? <ChevronUp size={16} color="#8A8474" /> : <ChevronDown size={16} color="#8A8474" />}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #F0EBE0" }}>
          {WARMUP_EXERCISES.map((ex, i) => {
            const done = warmupDone[ex.id];
            return (
              <button
                key={ex.id}
                onClick={() => onToggle(ex.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "11px 16px", background: "none", border: "none",
                  borderBottom: i < WARMUP_EXERCISES.length - 1 ? "1px solid #F5F1EA" : "none",
                  cursor: "pointer", textAlign: "left",
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: done ? "none" : "1.5px solid #DCD5C4", background: done ? "#4A5540" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done && <Check size={12} color="#FAF7F0" strokeWidth={3} />}
                </div>
                <span style={{ flex: 1, fontSize: 13.5, color: done ? "#8A8474" : "#2E2B26", textDecoration: done ? "line-through" : "none" }}>
                  {ex.name}
                </span>
                <span style={{ fontSize: 11, color: "#8A8474", fontFamily: "IBM Plex Mono, monospace", flexShrink: 0 }}>
                  {ex.reps}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ComplexCard({ complex, isToday, open, onToggle, completedSets, onToggleSet }) {
  const totalExercises = complex.exercises.length;
  const doneSets = complex.exercises.filter((ex, i) => (completedSets[`${complex.id}-${i}`] || 0) >= ex.sets).length;
  const allDone = doneSets === totalExercises;

  return (
    <div style={{ border: "1.5px solid " + (isToday ? complex.accent : "#DCD5C4"), borderRadius: 14, overflow: "hidden", background: "#FFFFFF" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", padding: "14px 16px", background: isToday ? complex.accent + "10" : "none", border: "none", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: allDone ? "#4A5540" : (isToday ? complex.accent + "25" : "#EDE6D6"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {allDone ? <Check size={17} color="#FAF7F0" strokeWidth={2.5} /> : <Dumbbell size={17} color={isToday ? complex.accent : "#7A8B6F"} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, fontWeight: 600, color: "#2E2B26" }}>{complex.title}</span>
            {isToday && (
              <span style={{ fontSize: 9.5, color: complex.accent, fontFamily: "IBM Plex Mono, monospace", background: complex.accent + "18", padding: "2px 7px", borderRadius: 20, fontWeight: 600, letterSpacing: "0.04em" }}>
                СЕГОДНЯ
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 3 }}>
            <span style={{ fontSize: 11, color: "#8A8474", fontFamily: "IBM Plex Mono, monospace" }}>{complex.freq}</span>
            {open && (
              <span style={{ fontSize: 11, color: "#7A8B6F", fontFamily: "IBM Plex Mono, monospace" }}>
                {doneSets}/{totalExercises} упр.
              </span>
            )}
          </div>
        </div>
        {open ? <ChevronUp size={16} color="#8A8474" /> : <ChevronDown size={16} color="#8A8474" />}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #F0EBE0" }}>
          {complex.exercises.map((ex, i) => {
            const key = `${complex.id}-${i}`;
            const done = completedSets[key] || 0;
            const exAllDone = done >= ex.sets;
            return (
              <div key={i} style={{ padding: "13px 16px", borderBottom: i < complex.exercises.length - 1 ? "1px solid #F5F1EA" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: exAllDone ? "#8A8474" : "#2E2B26", textDecoration: exAllDone ? "line-through" : "none", lineHeight: 1.35, flex: 1 }}>
                    {ex.name}
                  </span>
                  <span style={{ fontSize: 11.5, color: "#7A8B6F", fontFamily: "IBM Plex Mono, monospace", flexShrink: 0, fontWeight: 600 }}>
                    {ex.sets}×{ex.reps}
                  </span>
                </div>
                {ex.tip && (
                  <p style={{ fontSize: 11.5, color: "#8A8474", margin: "4px 0 8px", lineHeight: 1.4 }}>{ex.tip}</p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: ex.tip ? 0 : 8 }}>
                  {Array.from({ length: ex.sets }, (_, si) => (
                    <button
                      key={si}
                      onClick={() => onToggleSet(key, si + 1)}
                      style={{
                        width: 32, height: 32, borderRadius: "50%", border: "none",
                        background: si < done ? "#4A5540" : "#EDE6D6",
                        color: si < done ? "#FAF7F0" : "#8A8474",
                        fontFamily: "IBM Plex Mono, monospace", fontSize: 12, fontWeight: 600,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.15s",
                      }}
                    >
                      {si < done ? <Check size={13} strokeWidth={3} /> : si + 1}
                    </button>
                  ))}
                  {done > 0 && !exAllDone && (
                    <span style={{ fontSize: 10.5, color: "#8A8474", fontFamily: "IBM Plex Mono, monospace", marginLeft: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} /> {ex.rest}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function WorkoutTab() {
  const [openId, setOpenId] = useState(null);
  const [completedSets, setCompletedSets] = useState({});
  const [warmupDone, setWarmupDone] = useState({});

  const todayIdx = new Date().getDay();
  const todaySchedule = WEEKLY_SCHEDULE[todayIdx];

  const toggleSet = (key, i) => {
    setCompletedSets(prev => {
      const done = prev[key] || 0;
      return { ...prev, [key]: done === i ? i - 1 : i };
    });
  };

  const toggleWarmup = (id) => {
    setWarmupDone(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <div style={{ marginTop: 24 }}>
      {/* Today banner */}
      <div style={{ padding: "14px 16px", background: "#2E2B26", borderRadius: 14, marginBottom: 16 }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#7A8B6F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {DAY_NAMES[todayIdx]}
        </span>
        <p style={{ fontFamily: "Fraunces, serif", fontSize: 18, color: "#EDE6D6", margin: "6px 0 0", fontWeight: 500, lineHeight: 1.3 }}>
          {todaySchedule.rest ? "Отдых и восстановление" : todaySchedule.label}
        </p>
        {todaySchedule.rest && (
          <p style={{ fontSize: 12.5, color: "#7A8B6F", margin: "5px 0 0", lineHeight: 1.45 }}>
            Лёгкая растяжка или прогулка — отличный выбор для этого дня
          </p>
        )}
      </div>

      {/* Warmup */}
      <WarmupCard
        warmupDone={warmupDone}
        onToggle={toggleWarmup}
        open={openId === "warmup"}
        onOpenToggle={() => handleOpen("warmup")}
      />

      {/* Complexes */}
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
        {WORKOUT_COMPLEXES.map(complex => (
          <ComplexCard
            key={complex.id}
            complex={complex}
            isToday={todaySchedule.complexIds.includes(complex.id)}
            open={openId === complex.id}
            onToggle={() => handleOpen(complex.id)}
            completedSets={completedSets}
            onToggleSet={toggleSet}
          />
        ))}
      </div>

      {/* Weekly schedule */}
      <div style={{ marginTop: 20, padding: "14px 16px", background: "#EDE6D6", borderRadius: 12 }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#7A8B6F", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Недельное расписание
        </span>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => {
            const schedIdx = [1,2,3,4,5,6,0][i];
            const sched = WEEKLY_SCHEDULE[schedIdx];
            const isToday = todayIdx === schedIdx;
            return (
              <div key={day} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: isToday ? "#4A5540" : "#8A8474", fontWeight: isToday ? 700 : 400, width: 22, flexShrink: 0 }}>
                  {day}
                </span>
                <span style={{ fontSize: 12.5, color: isToday ? "#2E2B26" : "#5C5647", fontWeight: isToday ? 600 : 400, lineHeight: 1.3 }}>
                  {sched.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 14, padding: "14px 16px", background: "#FFFFFF", borderRadius: 12, border: "1.5px solid #DCD5C4", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Dumbbell size={14} color="#7A8B6F" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#5C5647", margin: 0 }}>
          Между тренировками одной группы мышц — минимум 48 часов отдыха. Нагрузку увеличивай постепенно: +5–10% в 1–2 недели.
        </p>
      </div>
    </div>
  );
}
