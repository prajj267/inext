import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface CSVPublication {
  Year: string;
  Title: string;
  Venue: string;
  Type: string;
}

async function updatePublications() {
  console.log('Reading CSV file...');
  
  // Read and parse CSV
  const csvPath = path.join(__dirname, '../arijit-roy-publications.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').slice(1); // Skip header
  
  const publications: CSVPublication[] = lines
    .filter(line => line.trim())
    .map(line => {
      const [Year, Title, Venue, Type] = line.split(',').map(s => s.trim());
      return { Year, Title, Venue, Type };
    });

  console.log(`Found ${publications.length} publications in CSV`);

  // Get existing publications from database
  const existingPubs = await prisma.publication.findMany();
  console.log(`Found ${existingPubs.length} publications in database`);

  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const pub of publications) {
    // Check if publication already exists (by title)
    const existing = existingPubs.find(
      p => p.title.toLowerCase() === pub.Title.toLowerCase()
    );

    if (existing) {
      // Update if needed
      if (existing.venue !== pub.Venue || existing.year !== parseInt(pub.Year)) {
        await prisma.publication.update({
          where: { id: existing.id },
          data: {
            venue: pub.Venue,
            year: parseInt(pub.Year),
            pubType: pub.Type,
          },
        });
        updated++;
        console.log(`✓ Updated: ${pub.Title}`);
      } else {
        skipped++;
      }
    } else {
      // Add new publication
      await prisma.publication.create({
        data: {
          title: pub.Title,
          authors: [{ text: 'Arijit Roy', bold: true }], // Default author, can be updated later
          venue: pub.Venue,
          year: parseInt(pub.Year),
          pubType: pub.Type,
          pdfPath: null,
          doiUrl: null,
        },
      });
      added++;
      console.log(`✓ Added: ${pub.Title}`);
    }
  }

  console.log('\n========================================');
  console.log('Publication Update Complete!');
  console.log('========================================');
  console.log(`Added: ${added}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total in database: ${added + existingPubs.length}`);

  await prisma.$disconnect();
}

updatePublications().catch(console.error);
