const fs = require("fs");
const path = require("path");

function checkExists(relativePath) {
  const fullPath = path.join(__dirname, "..", relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing required file: ${relativePath}`);
    process.exitCode = 1;
  }
}

function checkEnv() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) {
    console.warn("Warning: apps/web/.env not found. Copy from .env.example.");
  }
}

checkExists("prisma/schema.prisma");
checkExists("app/page.tsx");
checkEnv();

if (!process.exitCode) {
  console.log("Smoke check passed.");
}
