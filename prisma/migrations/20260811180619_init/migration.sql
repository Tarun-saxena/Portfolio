-- CreateTable
CREATE TABLE "UniqueVisitor" (
    "id" SERIAL NOT NULL,
    "ipHash" TEXT NOT NULL,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniqueVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniqueVisitor_ipHash_key" ON "UniqueVisitor"("ipHash");
