/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,year]` on the table `Holiday` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Holiday_userId_name_year_key` ON `Holiday`(`userId`, `name`, `year`);
