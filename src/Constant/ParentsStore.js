const STORAGE_KEY = 'madarsa_parent_entries';
const STORE_EVENT = 'madarsa-parents-updated';

const canUseStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const buildProfileParentEntries = (profiles) =>
  profiles.flatMap((student) =>
    student.parents.map((parent, index) => ({
      id: `profile-${student.admission.idNo}-${index}`,
      source: 'profile',
      role: parent.role || '',
      name: parent.name || '',
      phone: parent.phone || '',
      occupation: parent.occupation || '',
      createdAt: '2026-05-02',
    })),
  );

const readParents = () => {
  if (!canUseStorage) return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeParents = (entries) => {
  if (!canUseStorage) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const initializeParentEntries = (profiles) => {
  if (!canUseStorage) return;
  const currentEntries = readParents();
  if (currentEntries.length > 0) return;
  writeParents(buildProfileParentEntries(profiles));
};

export const getParentEntries = () => readParents();

export const getParentEntryById = (entryId) =>
  readParents().find((entry) => entry.id === entryId);

export const subscribeToParentEntries = (callback) => {
  if (!canUseStorage) return () => {};
  const handler = () => callback(readParents());
  window.addEventListener(STORE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(STORE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};

export const createParentEntry = (values) => ({
  id: `manual-${Date.now()}`,
  source: 'manual',
  role: values.role?.trim() || '',
  name: values.name?.trim() || '',
  phone: values.phone?.trim() || '',
  occupation: values.occupation?.trim() || '',
  createdAt: new Date().toISOString().split('T')[0],
});

export const saveParentEntry = (entry) => {
  const currentEntries = readParents();
  writeParents([entry, ...currentEntries]);
  return entry;
};

export const updateParentEntry = (entryId, values) => {
  const currentEntries = readParents();
  const nextEntries = currentEntries.map((entry) =>
    entry.id === entryId
      ? {
          ...entry,
          ...values,
          name: values.name?.trim() || '',
          role: values.role?.trim() || '',
          phone: values.phone?.trim() || '',
          occupation: values.occupation?.trim() || '',
        }
      : entry,
  );
  writeParents(nextEntries);
};

export const deleteParentEntry = (entryId) => {
  const currentEntries = readParents();
  writeParents(currentEntries.filter((entry) => entry.id !== entryId));
};
