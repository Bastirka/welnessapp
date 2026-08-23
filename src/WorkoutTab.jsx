import React, { useState } from "react";
import { Dumbbell, ChevronDown, ChevronUp, Check, Flame, Clock } from "lucide-react";

const WARMUP_EXERCISES = [
  { id: "w1", name: "Ходьба на месте",                   reps: "3 минуты",             img: "/vingrinajumi/walk_in_place.jpg" },
  { id: "w2", name: "Вращения руками и плечами",         reps: "10 в каждую сторону",  img: "/vingrinajumi/arm_rotations.jpg" },
  { id: "w3", name: "Наклоны корпуса в стороны",         reps: "10 повторов",           img: "/vingrinajumi/hip_tilts.jpg" },
  { id: "w4", name: "Вращения бёдрами",                  reps: "10 в каждую сторону",  img: null },
  { id: "w5", name: "Разминочные приседания",            reps: "10–15 повторов",        img: "/vingrinajumi/warmup_squats.jpg" },
  { id: "w6", name: "Выпады вперёд (Lunges)",            reps: "8–10 на ногу",          img: "/vingrinajumi/lunges.jpg" },
];

const WORKOUT_COMPLEXES = [
  {
    id: "glutes",
    title: "Ягодицы и бёдра",
    freq: "2–3 × в неделю",
    accent: "#C97D5D",
    exercises: [
      { name: "Разминочные приседания",                       sets: 3, reps: "15–20",      rest: "45–60 сек", tip: "Выполни приседание, вытяни руки вперёд. Поднимись и повтори.",                     img: "/vingrinajumi/warmup_squats.jpg" },
      { name: "Подъём бёдер (Glute Bridge)",                  sets: 3, reps: "15–20",      rest: "45 сек",    tip: "Удерживай спину прижатой к полу и выполняй движения контролируемо.",             img: "/vingrinajumi/glute_bridge.jpg" },
      { name: "Выпады вперёд (Lunges)",                       sets: 3, reps: "12 на ногу", rest: "45–60 сек", tip: "Колено должно быть над лодыжкой, спина прямая, смотри прямо вперёд.",            img: "/vingrinajumi/lunges.jpg" },
      { name: "Приседания сумо (Плие)",                       sets: 3, reps: "15",         rest: "45 сек",    tip: "Ступни шире бёдер, носки наружу. Колени следуют направлению носков.",             img: "/vingrinajumi/sumo_squats.jpg" },
      { name: "Отведение ноги назад (Glute Kickback)",        sets: 3, reps: "15 на ногу", rest: "30–45 сек", tip: "Спина прямая, живот напряжён. Начни с одной ноги, затем смени сторону.",          img: "/vingrinajumi/glute_kickback.jpg" },
      { name: "Приседание на одной ноге (нога на стуле)",    sets: 3, reps: "12–15",      rest: "60 сек",    tip: "Колено не заходит за носки, взгляд направлен вперёд.",                            img: "/vingrinajumi/single_leg_squat.jpg" },
      { name: "Приседания с прыжком (Squat Jump)",            sets: 3, reps: "20 прыжков", rest: "30–45 сек", tip: "Колени не заходят за носки. Спина прямая, живот напряжён.",                      img: "/vingrinajumi/squat_jump.jpg" },
    ],
  },
  {
    id: "waist",
    title: "Талия и живот",
    freq: "3–4 × в неделю",
    accent: "#7A8B6F",
    exercises: [
      { name: "Планка (Plank)",                               sets: 3, reps: "30–45 сек",        rest: "30–45 сек", tip: "Встань на локти и кончики пальцев. Удерживай спину прямой всё время.",        img: "/vingrinajumi/plank.jpg" },
      { name: "Обратные скручивания (Reverse Crunch)",        sets: 3, reps: "15–20",             rest: "30–45 сек", tip: "Удерживай спину прижатой к полу всё время. Движения медленные и контролируемые.", img: "/vingrinajumi/reverse_crunch.jpg" },
      { name: "Боковая планка (Side Plank)",                  sets: 3, reps: "20–30 сек / сторону",rest: "30 сек",  tip: "Удерживай тело в прямой линии и живот напряжённым всё время.",                img: "/vingrinajumi/side_plank.jpg" },
      { name: "Скручивания «велосипед» (Bicycle Crunches)",   sets: 3, reps: "30–60 сек",        rest: "30–45 сек", tip: "Удерживай спину на полу и выполняй контролируемые движения всё время.",       img: "/vingrinajumi/bicycle_crunches.jpg" },
      { name: "Подъём ног лёжа (Leg Raises)",                 sets: 3, reps: "12–15",             rest: "45 сек",    tip: "Удерживай спину на полу, не напрягай шею. Дыши равномерно.",                  img: "/vingrinajumi/leg_raises.jpg" },
      { name: "Русские скручивания (Russian Twists)",         sets: 3, reps: "20",                rest: "30–45 сек", tip: "Удерживай спину в прямой линии и живот напряжённым всё время.",              img: "/vingrinajumi/russian_twists.jpg" },
      { name: "Подтягивание колен к груди (Mountain Climbers)",sets: 3, reps: "30–40 сек",       rest: "30 сек",    tip: "Спина прямая, не прогибай живот. Дыши ритмично.",                            img: "/vingrinajumi/mountain_climbers.jpg" },
    ],
  },
  {
    id: "chest",
    title: "Грудь",
    freq: "2 × в неделю",
    accent: "#4A5540",
    exercises: [
      { name: "Отжимания с колен (Knee Push-Up)",                       sets: 3, reps: "8–15",  rest: "60 сек",    tip: "Движения выполняй с колен. Спина прямая, живот напряжён.",                     img: "/vingrinajumi/knee_pushup.jpg" },
      { name: "Жим гантелей стоя над головой (Dumbbell Shoulder Press)",sets: 3, reps: "8–15",  rest: "45–60 сек", tip: "Удерживай спину прямой, живот напряжённым и движения контролируемыми.",      img: "/vingrinajumi/dumbbell_shoulder_press.jpg" },
      { name: "Жим гантелей лёжа на полу (Dumbbell Floor Press)",       sets: 3, reps: "8–15",  rest: "60 сек",    tip: "Удерживай спину на полу и выполняй движения контролируемо. Локти близко к бокам.", img: "/vingrinajumi/dumbbell_floor_press.jpg" },
      { name: "Разведение гантелей лёжа на полу (Dumbbell Floor Fly)",  sets: 3, reps: "8–15",  rest: "45 сек",    tip: "Удерживай спину на полу, движения контролируемые. Локти слегка согнуты.",     img: "/vingrinajumi/dumbbell_floor_fly.jpg" },
      { name: "Пуловер с гантелью лёжа на полу (Dumbbell Pullover)",    sets: 3, reps: "10–15", rest: "45 сек",    tip: "Удерживай спину на полу, движения контролируемые. Локти неподвижны.",         img: "/vingrinajumi/dumbbell_pullover.jpg" },
      { name: "Отжимания с колен — узкий хват",                        sets: 3, reps: "8–12",  rest: "60 сек",    tip: "Движения выполняй с колен. Локти ближе к бокам тела.",                        img: "/vingrinajumi/knee_pushup.jpg" },
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
  { label: "Ягодицы + живот (комбо)",         complexIds: ["glutes", "waist"], rest: false },
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
              <div
                key={ex.id}
                onClick={() => onToggle(ex.id)}
                style={{
                  width: "100%", borderBottom: i < WARMUP_EXERCISES.length - 1 ? "1px solid #F5F1EA" : "none",
                  cursor: "pointer", overflow: "hidden",
                }}
              >
                {ex.img && (
                  <div style={{ width: "100%", height: 165, background: "#EDE6D6", overflow: "hidden" }}>
                    <img src={ex.img} alt={ex.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: done ? 0.4 : 1, transition: "opacity 0.2s", display: "block" }} />
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: done ? "none" : "1.5px solid #DCD5C4", background: done ? "#4A5540" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {done && <Check size={12} color="#FAF7F0" strokeWidth={3} />}
                  </div>
                  <span style={{ flex: 1, fontSize: 13.5, color: done ? "#8A8474" : "#2E2B26", textDecoration: done ? "line-through" : "none" }}>
                    {ex.name}
                  </span>
                  <span style={{ fontSize: 11, color: "#8A8474", fontFamily: "IBM Plex Mono, monospace", flexShrink: 0 }}>
                    {ex.reps}
                  </span>
                </div>
              </div>
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
              <div key={i} style={{ borderBottom: i < complex.exercises.length - 1 ? "1px solid #F5F1EA" : "none", overflow: "hidden" }}>
                {ex.img && (
                  <div style={{ width: "100%", height: 165, overflow: "hidden", background: "#EDE6D6" }}>
                    <img
                      src={ex.img}
                      alt={ex.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", opacity: exAllDone ? 0.45 : 1, transition: "opacity 0.2s" }}
                    />
                  </div>
                )}
                <div style={{ padding: "12px 16px 13px" }}>
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
