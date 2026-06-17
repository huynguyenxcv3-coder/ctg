import { describe, it, expect } from 'vitest';

function stripFilename(path: string | undefined | null): string {
  if (!path) return '';
  const index = path.lastIndexOf('/');
  return path.slice(0, index + 1);
}

describe('stripFilename', () => {
  it('should return an empty string for undefined or null', () => {
    expect(stripFilename(undefined)).toBe('');
    expect(stripFilename(null)).toBe('');
  });

  it('should remove everything after the last slash', () => {
    expect(stripFilename('path/to/file.txt')).toBe('path/to/');
    expect(stripFilename('/absolute/path')).toBe('/absolute/');
  });

  it('should return empty string if no slash is present', () => {
    expect(stripFilename('filename.txt')).toBe('');
  });

  it('should handle paths with only a slash', () => {
    expect(stripFilename('/')).toBe('/');
  });

  it('should handle empty paths', () => {
    expect(stripFilename('')).toBe('');
  });
});
