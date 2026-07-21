const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updatePublications() {
  console.log('Reading CSV file...');
  
  // Read and parse CSV
  const csvPath = path.join(__dirname, 'arijit-roy-publications.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').slice(1); // Skip header
  
  const publications = lines
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split(',');
      const Year = parts[0].trim();
      const Title = parts.slice(1, -2).join(',').trim(); // Handle titles with commas
      const Venue = parts[parts.length - 2].trim();
      const Type = parts[parts.length - 1].trim();
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
        console.log(`✓ Updated: ${pub.Title.substring(0, 60)}...`);
      } else {
        skipped++;
      }
    } else {
      // Add new publication
      await prisma.publication.create({
        data: {
          title: pub.Title,
          authors: [{ text: 'Arijit Roy', bold: true }],
          venue: pub.Venue,
          year: parseInt(pub.Year),
          pubType: pub.Type,
          pdfPath: null,
          doiUrl: null,
        },
      });
      added++;
      console.log(`✓ Added: ${pub.Title.substring(0, 60)}...`);
    }
  }

  console.log('\n========================================');
  console.log('Publication Update Complete!');
  console.log('========================================');
  console.log(`Added: ${added}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (unchanged): ${skipped}`);
  console.log(`Total in database now: ${added + existingPubs.length}`);

  await prisma.$disconnect();
}

updatePublications().catch(console.error);
