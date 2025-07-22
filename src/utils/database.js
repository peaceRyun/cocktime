import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('cocktime.db');

export const initDatabase = async () => {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY NOT NULL, 
                email TEXT NOT NULL UNIQUE, 
                password TEXT NOT NULL
            );
        `);
        console.log('Users table created successfully or already exists.');
    } catch (error) {
        console.error('Error creating users table:', error);
        throw error;
    }
};

export const addUser = async (email, password) => {
    try {
        const result = await db.runAsync('INSERT INTO users (email, password) VALUES (?, ?);', [email, password]);
        console.log('User added successfully:', result);
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const getUser = async (email) => {
    try {
        const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', [email]);
        console.log('User fetched successfully:', result);
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

//디버깅용 함수 start
export const getAllUsers = async () => {
    try {
        const result = await db.getAllAsync('SELECT * FROM users;');
        console.log('모든 사용자 목록:', result);
        return result;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const getUserCount = async () => {
    try {
        const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM users;');
        console.log('총 사용자 수:', result?.count || 0);
        return result?.count || 0;
    } catch (error) {
        console.error('Error counting users:', error);
        throw error;
    }
};

export const deleteAllUsers = async () => {
    try {
        const result = await db.runAsync('DELETE FROM users;');
        console.log('모든 사용자 삭제됨');
        return result;
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};


//디버깅용 함수 end
