ALTER TYPE "public"."role" ADD VALUE 'MEMBER' BEFORE 'ADMIN';--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_university_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "academic_year" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "university" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "university_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "university_card";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");