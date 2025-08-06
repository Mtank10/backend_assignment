-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_geoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_geoId_fkey" FOREIGN KEY ("geoId") REFERENCES "public"."Geo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
