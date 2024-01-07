export const isValidTypeScriptInterface = (schema: string) => {
  // Basic checks for TypeScript interface structure
  const interfacePattern = /^\s*interface\s+\w+\s*{[^}]*}\s*$/;
  const propertyPattern = /^\s*\w+\s*:\s*\w+;$/;

  // Split schema into lines and check each line
  const lines = schema.trim().split(/\n/);
  if (!interfacePattern.test(lines[0])) {
    return false; // First line must match the interface pattern
  }

  for (let i = 1; i < lines.length - 1; i++) {
    if (!propertyPattern.test(lines[i])) {
      return false; // Each property line must match the property pattern
    }
  }

  return true; // Passes all basic checks
};
