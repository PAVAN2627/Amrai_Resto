export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'counter';
  password?: string;
}

const DEFAULT_USERS: MockUser[] = [
  { id: '1', name: 'Admin', email: 'admin@aamrairesort.com', role: 'admin', password: 'admin123' },
  { id: '2', name: 'Counter Staff', email: 'counter@aamrairesort.com', role: 'counter', password: 'counter123' },
];

const USERS_KEY = 'aamrai_users';
const AUTH_KEY = 'aamrai_auth_user';

function getUsers(): MockUser[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(stored) as MockUser[];
  } catch {
    return DEFAULT_USERS;
  }
}

function saveUsers(users: MockUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function mockSignIn(email: string, password: string): { user: MockUser | null; error: string | null } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { user: null, error: 'User not found' };
  if (user.password !== password) return { user: null, error: 'Incorrect password' };
  const { password: _pw, ...safeUser } = user;
  localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
  return { user: safeUser, error: null };
}

export function mockSignOut() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): MockUser | null {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as MockUser;
  } catch {
    return null;
  }
}

export function getAllStaff(): MockUser[] {
  return getUsers().map(({ password, ...u }) => u);
}

export function addStaff(name: string, email: string, password: string, role: 'admin' | 'counter'): { error: string | null } {
  const users = getUsers();
  if (users.find((u) => u.email === email)) return { error: 'Email already exists' };
  const newUser: MockUser = {
    id: String(Date.now()),
    name,
    email,
    role,
    password,
  };
  users.push(newUser);
  saveUsers(users);
  return { error: null };
}

export function deleteStaff(id: string): { error: string | null } {
  const users = getUsers();
  if (id === '1') return { error: 'Cannot delete the main admin account' };
  const filtered = users.filter((u) => u.id !== id);
  saveUsers(filtered);
  return { error: null };
}
