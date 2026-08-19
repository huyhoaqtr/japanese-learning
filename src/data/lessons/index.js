import bai01 from "./bai-01";

const lessons = [bai01];

const TOTAL_LESSONS = 25;

export function getLessonList() {
  const byNumber = new Map(lessons.map((lesson) => [lesson.number, lesson]));

  return Array.from({ length: TOTAL_LESSONS }, (_, index) => {
    const number = index + 1;
    const lesson = byNumber.get(number);

    if (lesson) {
      return { id: lesson.id, number, title: lesson.title, status: "available" };
    }

    return {
      id: `bai-${String(number).padStart(2, "0")}`,
      number,
      title: `Bài ${number}`,
      status: "coming-soon",
    };
  });
}

export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}
