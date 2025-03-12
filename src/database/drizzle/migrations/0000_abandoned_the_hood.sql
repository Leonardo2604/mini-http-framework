CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(180) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"birthday" timestamp with time zone NOT NULL,
	"gender" smallint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
