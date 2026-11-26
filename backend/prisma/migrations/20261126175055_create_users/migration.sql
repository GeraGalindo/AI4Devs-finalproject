-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "token_version" INTEGER NOT NULL DEFAULT 0,
    "timezone" TEXT NOT NULL,
    "available_weekdays" SMALLINT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- >>> SQL manual (readme.md 3.2): restricciones que el esquema de Prisma no puede expresar.
-- Prisma no compara CHECK al calcular diferencias: no borres este bloque ni lo edites en
-- migraciones posteriores. Cualquier cambio va en una migración nueva.
ALTER TABLE "users"
  ADD CONSTRAINT "users_email_normalized_chk" CHECK ("email" = lower(btrim("email")));

ALTER TABLE "users"
  ADD CONSTRAINT "users_token_version_nonneg_chk" CHECK ("token_version" >= 0);

-- NULL hasta que el usuario configura sus días; si no, de 2 a 6 valores entre 0 y 6.
-- La unicidad de los días no la garantiza este CHECK: la valida la aplicación (Zod).
ALTER TABLE "users"
  ADD CONSTRAINT "users_available_weekdays_chk" CHECK (
    "available_weekdays" IS NULL
    OR (
      cardinality("available_weekdays") BETWEEN 2 AND 6
      AND "available_weekdays" <@ '{0,1,2,3,4,5,6}'::smallint[]
    )
  );
-- <<< SQL manual
