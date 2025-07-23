import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

let db = SQLite.openDatabaseSync('cocktime.db');

export const getDb = () => db;

export const closeDatabase = () => {
    if (db) {
        db.closeSync();
        db = null;
        console.log('Database closed.');
    }
};

export const openDatabase = () => {
    if (!db) {
        db = SQLite.openDatabaseSync('cocktime.db');
        console.log('Database opened.');
    }
    return db;
};

// 데이터베이스 스키마 초기화
export const initDatabase = async () => {
    try {
        await db.execAsync(`
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL UNIQUE,
                gender INTEGER CHECK(gender IN (0, 1))
            );

            CREATE TABLE IF NOT EXISTS games (
                game_id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_date TEXT NOT NULL DEFAULT (datetime('now','localtime')),
                memo TEXT
            );

            CREATE TABLE IF NOT EXISTS events (
                event_id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER NOT NULL,
                event_type TEXT NOT NULL CHECK(event_type IN ('singles', 'doubles')),
                player_count INTEGER NOT NULL,
                FOREIGN KEY (game_id) REFERENCES games (game_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS rounds (
                round_id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_id INTEGER NOT NULL,
                round_number INTEGER NOT NULL,
                serve_user_id INTEGER,
                winner_user_id INTEGER,
                score_difference INTEGER,
                FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE,
                FOREIGN KEY (serve_user_id) REFERENCES users (user_id) ON DELETE SET NULL,
                FOREIGN KEY (winner_user_id) REFERENCES users (user_id) ON DELETE SET NULL
            );
        `);
        console.log('Database tables created successfully or already exist.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

// User 관련 함수
export const addUser = async (nickname, gender) => {
    try {
        const result = await db.runAsync('INSERT INTO users (nickname, gender) VALUES (?, ?);', [nickname, gender]);
        console.log(`User added with ID: ${result.lastInsertRowId}`);
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const getUser = async (nickname) => {
    try {
        const result = await db.getFirstAsync('SELECT * FROM users WHERE nickname = ?;', [nickname]);
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const result = await db.getAllAsync('SELECT * FROM users;');
        return result;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

// Game 관련 함수
export const getGamesWithMemberNicknames = async () => {
    try {
        const games = await db.getAllAsync('SELECT * FROM games ORDER BY start_time DESC;');
        const gamesWithNicknames = [];

        for (const game of games) {
            if (game.members) {
                const memberIds = game.members.split(',').map(id => parseInt(id.trim()));
                const placeholders = memberIds.map(() => '?').join(',');
                const users = await db.getAllAsync(`SELECT nickname FROM users WHERE user_id IN (${placeholders})`, memberIds);
                game.nicknames = users.map(u => u.nickname);
            }
            gamesWithNicknames.push(game);
        }
        return gamesWithNicknames;
    } catch (error) {
        console.error('Error fetching games with member nicknames:', error);
        throw error;
    }
};


// 데이터베이스 파일 내보내기/가져오기
export const exportDatabase = async () => {
    try {
        if (FileSystem.documentDirectory) {
            const dbUri = FileSystem.documentDirectory + 'SQLite/cocktime.db';
            await Sharing.shareAsync(dbUri);
        } else {
            console.log("No document directory found to export from.")
        }
    } catch (error) {
        console.error('Error exporting database:', error);
        throw error;
    }
};

export const importDatabase = async (uri) => {
    console.log('Starting database import process...');
    try {
        console.log('Closing current database connection...');
        closeDatabase();
        console.log('Database connection closed.');

        const dbPath = FileSystem.documentDirectory + 'SQLite/cocktime.db';
        console.log(`Destination path: ${dbPath}`);
        console.log(`Source URI: ${uri}`);

        console.log('Copying file...');
        await FileSystem.copyAsync({ from: uri, to: dbPath });
        console.log('File copied successfully.');

        console.log('Re-opening database connection...');
        openDatabase();
        console.log('Database imported and opened successfully.');
    } catch (error) {
        console.error('Error during database import in database.js:', error);
        openDatabase(); // 오류 발생 시에도 DB 연결 복구 시도
        throw error;
    }
};

//디버깅용 함수
export const deleteAllData = async () => {
    try {
        await db.execAsync(`
            DELETE FROM rounds;
            DELETE FROM events;
            DELETE FROM games;
            DELETE FROM users;
        `);
        console.log('All data from all tables has been deleted.');
    } catch (error) {
        console.error('Error deleting all data:', error);
        throw error;
    }
};