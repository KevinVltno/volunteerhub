"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { activities as baseActivities, demoAccount, type Activity, type Category } from "./data";

export type User = { name: string; email: string };
export type RegStatus = "terdaftar" | "checkin" | "selesai";
export type RegisterForm = { fullName: string; phone: string; motivation: string };
export type Registration = RegisterForm & {
  id: string;
  activityId: string;
  status: RegStatus;
  registeredAt: string;
  checkinAt?: string;
  completedAt?: string;
  hours?: number;
  certificateId?: string;
};

type Status = "booting" | "anon" | "ready";
type UserData = { favorites: string[]; interests: Category[]; registrations: Registration[] };
type Account = { name: string; password: string };

// Semua data disimpan di localStorage browser (dummy, tanpa backend)
type Persisted = {
  accounts: Record<string, Account>;
  session: string | null;
  data: Record<string, UserData>;
};

type Ctx = UserData & {
  status: Status;
  user: User | null;
  activities: Activity[];
  getActivity: (id: string) => Activity | undefined;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  toggleFavorite: (id: string) => void;
  toggleInterest: (c: Category) => void;
  register: (activityId: string, form: RegisterForm) => void;
  checkIn: (regId: string) => void;
  complete: (regId: string, hours: number) => void;
};

const KEY = "volunteerhub:v2";
const emptyUser: UserData = { favorites: [], interests: [], registrations: [] };
const initial: Persisted = {
  accounts: { [demoAccount.email]: { name: demoAccount.name, password: demoAccount.password } },
  session: null,
  data: {},
};
const AppContext = createContext<Ctx | null>(null);
const norm = (email: string) => email.trim().toLowerCase();

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Membaca localStorage (sistem eksternal) sekali saat aplikasi pertama dibuka.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Persisted;
        // akun demo selalu tersedia
        setState({ ...initial, ...saved, accounts: { ...initial.accounts, ...saved.accounts } });
      }
    } catch {}
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state, loaded]);

  const email = state.session;
  const account = email ? state.accounts[email] : undefined;
  const user: User | null = email && account ? { name: account.name, email } : null;
  const mine: UserData = (email && state.data[email]) || emptyUser;
  const status: Status = !loaded ? "booting" : user ? "ready" : "anon";

  const patch = useCallback((fn: (d: UserData) => UserData) => {
    setState((s) => {
      if (!s.session) return s;
      const cur = s.data[s.session] ?? emptyUser;
      return { ...s, data: { ...s.data, [s.session]: fn(cur) } };
    });
  }, []);

  const login = useCallback((rawEmail: string, password: string) => {
    const e = norm(rawEmail);
    const acc = state.accounts[e];
    if (!acc) throw new Error("Akun belum terdaftar. Gunakan akun demo atau buat akun baru.");
    if (acc.password !== password) throw new Error("Kata sandi salah.");
    setState((s) => ({ ...s, session: e }));
  }, [state.accounts]);

  const signup = useCallback((name: string, rawEmail: string, password: string) => {
    const e = norm(rawEmail);
    if (state.accounts[e]) throw new Error("Email ini sudah terdaftar. Silakan masuk.");
    setState((s) => ({ ...s, accounts: { ...s.accounts, [e]: { name, password } }, session: e }));
  }, [state.accounts]);

  const logout = useCallback(() => setState((s) => ({ ...s, session: null })), []);

  const toggleFavorite = useCallback((id: string) => {
    patch((d) => ({ ...d, favorites: d.favorites.includes(id) ? d.favorites.filter((f) => f !== id) : [...d.favorites, id] }));
  }, [patch]);

  const toggleInterest = useCallback((c: Category) => {
    patch((d) => ({ ...d, interests: d.interests.includes(c) ? d.interests.filter((i) => i !== c) : [...d.interests, c] }));
  }, [patch]);

  const register = useCallback((activityId: string, form: RegisterForm) => {
    patch((d) => {
      if (d.registrations.some((r) => r.activityId === activityId)) return d;
      const reg: Registration = {
        ...form, id: `reg-${Date.now()}`, activityId, status: "terdaftar", registeredAt: new Date().toISOString(),
      };
      return { ...d, registrations: [reg, ...d.registrations] };
    });
  }, [patch]);

  const checkIn = useCallback((regId: string) => {
    patch((d) => ({
      ...d,
      registrations: d.registrations.map((r) => (r.id === regId ? { ...r, status: "checkin", checkinAt: new Date().toISOString() } : r)),
    }));
  }, [patch]);

  const complete = useCallback((regId: string, hours: number) => {
    patch((d) => ({
      ...d,
      registrations: d.registrations.map((r) =>
        r.id === regId
          ? { ...r, status: "selesai", hours, completedAt: new Date().toISOString(), certificateId: `VH-${Date.now().toString(36).toUpperCase()}` }
          : r
      ),
    }));
  }, [patch]);

  // Kuota terisi ikut bertambah saat pengguna mendaftar
  const activities = useMemo(
    () => baseActivities.map((a) => (mine.registrations.some((r) => r.activityId === a.id) ? { ...a, filled: Math.min(a.quota, a.filled + 1) } : a)),
    [mine.registrations]
  );
  const getActivity = useCallback((id: string) => activities.find((a) => a.id === id), [activities]);

  const value: Ctx = {
    ...mine, status, user, activities, getActivity,
    login, signup, logout, toggleFavorite, toggleInterest, register, checkIn, complete,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam AppProvider");
  return ctx;
}
