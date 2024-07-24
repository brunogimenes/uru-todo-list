import { describe, test, expect } from 'vitest';
import { todoFilters } from './filters';


describe('todoFilters', () => {
  test('should have the correct number of filters', () => {
    expect(todoFilters.length).toBe(3);
  });

  test('should have a filter with id "all" and label "All"', () => {
    const filter = todoFilters.find(filter => filter.id === 'all');
    expect(filter).toBeDefined();
    expect(filter).toHaveProperty('label', 'All');
  });

  test('should have a filter with id "completed" and label "Completed"', () => {
    const filter = todoFilters.find(filter => filter.id === 'completed');
    expect(filter).toBeDefined();
    expect(filter).toHaveProperty('label', 'Completed');
  });

  test('should have a filter with id "pending" and label "Pending"', () => {
    const filter = todoFilters.find(filter => filter.id === 'pending');
    expect(filter).toBeDefined();
    expect(filter).toHaveProperty('label', 'Pending');
  });
});
