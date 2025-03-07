
import { json,pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList',{
    id:serial().primaryKey(),
    courseId:varchar('courseId'),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('yes'),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('username'),
    userProfileImage:varchar('userProfileImage')
})