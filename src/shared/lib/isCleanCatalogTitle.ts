const GARBAGE_PATTERN =
  /тест|проверк|test|postman|\btmp\b|neww+|спека|скилл|навык|htmi|yh-\d+|tect|fafaf|dsdadada|моя новая специализация|ава|цуе45е|навык/i;

export function isCleanCatalogTitle(title: unknown): boolean {
  if (typeof title !== "string") {
    return false;
  }

  const normalized = title.trim();

  if (normalized.length < 3) {
    return false;
  }

  if (/^\d+$/.test(normalized)) {
    return false;
  }

  if (GARBAGE_PATTERN.test(normalized)) {
    return false;
  }

  return true;
}

export type CatalogItem = {
  title: string;
};
export function filterCatalogItems<T extends CatalogItem>(items: T[] | null | undefined) {
  return (items ?? []).filter((item) => isCleanCatalogTitle(item.title));
}
