CREATE TABLE "customers" (
    "customer_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "cpf" TEXT UNIQUE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id"),
    CONSTRAINT "customers_email_cpf" UNIQUE ("email", "cpf")
);
