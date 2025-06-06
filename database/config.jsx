import * as SQLite from 'expo-sqlite';

// Single source of truth for database instance
const db = SQLite.openDatabase('infos.db');

export { db };
