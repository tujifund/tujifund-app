package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "modernc.org/sqlite" // Modern SQLite driver
)

// DBConfig holds database configuration
type DBConfig struct {
	Driver string
	DBName string
}

// DBInstance holds the database instance and configuration
type DBInstance struct {
	DB   *sql.DB
	Conf DBConfig
}

// Session timeout duration
const sessionTimeout = 30 * time.Minute

// NewDBInstance creates a new database connection
func NewDBInstance(conf DBConfig) (*DBInstance, error) {
	// Create the database directory if it doesn't exist
	if err := os.MkdirAll(filepath.Dir(conf.DBName), 0o755); err != nil {
		return nil, fmt.Errorf("failed to create database directory: %w", err)
	}

	dsn := fmt.Sprintf("file:%s?cache=shared&_journal_mode=WAL", conf.DBName)
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test the connection
	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Enable foreign key support
	if _, err := db.Exec("PRAGMA foreign_keys = ON;"); err != nil {
		return nil, fmt.Errorf("failed to enable foreign keys: %w", err)
	}

	// Set connection pool settings
	db.SetMaxOpenConns(1) // SQLite only supports one writer at a time

	return &DBInstance{
		DB:   db,
		Conf: conf,
	}, nil
}

// InitializeDatabase creates tables and initializes the database
func (dbi *DBInstance) InitializeDatabase() error {
	// Read the schema file
	path := filepath.Join("database", "database_schema.sql")
	schema, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("failed to read schema file: %w", err)
	}

	// Execute the schema
	if _, err := dbi.DB.Exec(string(schema)); err != nil {
		// Ignore "already exists" errors
		if !strings.Contains(err.Error(), "already exists") {
			return fmt.Errorf("failed to execute schema: %w", err)
		}
	}

	log.Println("Database initialized successfully")
	return nil
}

// Close closes the database connection
func (dbi *DBInstance) Close() error {
	return dbi.DB.Close()
}

// GetDB returns the database instance
func (dbi *DBInstance) GetDB() *sql.DB {
	return dbi.DB
}

// CreateSession inserts a new session into the database
func CreateSession(db *sql.DB, userID, token, ip, userAgent string, duration time.Duration) error {
	_, err := db.Exec(`
        INSERT INTO sessions (id, user_id, token, ip_address, user_agent, expires_at, last_activity, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, generateUUID(), userID, token, ip, userAgent, time.Now().Add(duration))
	return err
}
