-- AlterTable
CREATE SEQUENCE accounts_id_seq;
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT nextval('accounts_id_seq');
ALTER SEQUENCE accounts_id_seq OWNED BY "accounts"."id";
