-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_eventToscreening" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_eventToscreening_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_eventToscreening_B_index" ON "_eventToscreening"("B");

-- AddForeignKey
ALTER TABLE "_eventToscreening" ADD CONSTRAINT "_eventToscreening_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventToscreening" ADD CONSTRAINT "_eventToscreening_B_fkey" FOREIGN KEY ("B") REFERENCES "screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;
