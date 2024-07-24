export type FilterTypes = 'all' | 'completed' | 'pending';

export const todoFilters: { id: FilterTypes; label: string }[] = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'completed',
    label: 'Completed',
  },
  {
    id: 'pending',
    label: 'Pending',
  },
];
