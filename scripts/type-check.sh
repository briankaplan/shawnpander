#!/bin/bash

# Run TypeScript compiler in strict mode
echo "Running type check..."
tsc --noEmit --strict

# Run ESLint
echo "Running ESLint..."
npm run lint

# Check for circular dependencies
echo "Checking for circular dependencies..."
madge --circular --extensions ts,tsx src/ 