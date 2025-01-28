import type { LocationQueryValue } from 'vue-router';

export function normalizeQueryValue(
  value: LocationQueryValue | LocationQueryValue[] | null | undefined
) {
  if (!value) return '';
  if (Array.isArray(value)) return value[0] || '';
  return value;
}
