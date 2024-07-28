import { describe, it, expect } from 'vitest';
import { listColors } from './list-colors';


describe('listColors', () => {
  it('should be an array', () => {
    expect(Array.isArray(listColors)).toBe(true);
  });

  it('should contain objects with value and label properties', () => {
    listColors.forEach(color => {
      expect(color).toHaveProperty('value');
      expect(color).toHaveProperty('label');
    });
  });
});
