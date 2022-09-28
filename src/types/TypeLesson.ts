export enum LessonType  {
  Class = 'class',
  Live = 'live',
}
   


export interface TypeLesson {
  title: string;
  slug: string;
  videoId: string;
  lessonType: LessonType;
  description: string;
  availableAt: string;
}
