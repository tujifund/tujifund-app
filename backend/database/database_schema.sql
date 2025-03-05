-- Tujifund/ChamaVault Database Schema
-- A comprehensive schema for managing group savings and investments

-- Users table to store user information
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone_number TEXT,
    profile_image_url TEXT,
    bio TEXT,
    is_verified INTEGER DEFAULT 0,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    metadata JSON
);

-- User verification table
CREATE TABLE IF NOT EXISTS user_verification (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_token TEXT NOT NULL,
    type TEXT NOT NULL, -- email, phone, etc.
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, type)
);

-- User wallets/accounts
CREATE TABLE IF NOT EXISTS wallets (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, currency)
);

-- Session management
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    newsletter_subscription BOOLEAN DEFAULT TRUE,
    language TEXT DEFAULT 'en',
    theme TEXT DEFAULT 'light',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chamas table to store group information
CREATE TABLE IF NOT EXISTS chamas (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    icon_url TEXT,
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    settings JSON
);

-- Chama memberships
CREATE TABLE IF NOT EXISTS chama_members (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member', -- admin, treasurer, secretary, member, etc.
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'active', -- active, inactive, suspended
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chama_id, user_id)
);

-- Chama accounts/wallets
CREATE TABLE IF NOT EXISTS chama_accounts (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    account_type TEXT NOT NULL, -- general, merry-go-round, welfare, loans, shares
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chama_id, name)
);

-- Chama Contributions/Payments
CREATE TABLE IF NOT EXISTS contributions (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id TEXT NOT NULL REFERENCES chama_accounts(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    contribution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method TEXT, -- bank transfer, mobile money, cash, etc.
    transaction_reference TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed
    payment_proof_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan products/types
CREATE TABLE IF NOT EXISTS loan_products (
    id TEXT PRIMARY KEY,
    chama_id TEXT REFERENCES chamas(id) ON DELETE CASCADE, -- NULL means system-wide loan product
    name TEXT NOT NULL,
    description TEXT,
    interest_rate DECIMAL(5, 2) NOT NULL, -- percentage
    interest_type TEXT NOT NULL DEFAULT 'flat', -- flat, reducing, compound
    min_amount DECIMAL(15, 2) NOT NULL,
    max_amount DECIMAL(15, 2) NOT NULL,
    min_term INTEGER NOT NULL, -- in days
    max_term INTEGER NOT NULL, -- in days
    grace_period INTEGER NOT NULL DEFAULT 0, -- in days
    late_payment_fee DECIMAL(15, 2),
    early_payment_fee DECIMAL(15, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan applications
CREATE TABLE IF NOT EXISTS loan_applications (
    id TEXT PRIMARY KEY,
    chama_id TEXT REFERENCES chamas(id) ON DELETE SET NULL, -- NULL for platform loans
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    loan_product_id TEXT NOT NULL REFERENCES loan_products(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    term INTEGER NOT NULL, -- in days
    purpose TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, disbursed, completed
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    approval_date TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loans table
CREATE TABLE IF NOT EXISTS loans (
    id TEXT PRIMARY KEY,
    application_id TEXT NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    chama_id TEXT REFERENCES chamas(id) ON DELETE SET NULL, -- NULL for platform loans
    borrower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    loan_product_id TEXT NOT NULL REFERENCES loan_products(id) ON DELETE CASCADE,
    principal_amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    interest_type TEXT NOT NULL,
    term INTEGER NOT NULL, -- in days
    disbursement_date TIMESTAMP,
    expected_end_date TIMESTAMP,
    actual_end_date TIMESTAMP,
    total_repaid DECIMAL(15, 2) DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, active, completed, defaulted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Loan Repayments
CREATE TABLE IF NOT EXISTS loan_repayments (
    id TEXT PRIMARY KEY,
    loan_id TEXT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    principal_component DECIMAL(15, 2) NOT NULL,
    interest_component DECIMAL(15, 2) NOT NULL,
    penalties DECIMAL(15, 2) DEFAULT 0.00,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method TEXT,
    transaction_reference TEXT,
    status TEXT NOT NULL DEFAULT 'completed', -- pending, completed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan Guarantors
CREATE TABLE IF NOT EXISTS loan_guarantors (
    id TEXT PRIMARY KEY,
    loan_id TEXT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    guarantor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guarantee_amount DECIMAL(15, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(loan_id, guarantor_id)
);

-- Welfare Funds
CREATE TABLE IF NOT EXISTS welfare_funds (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    account_id TEXT NOT NULL REFERENCES chama_accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    total_contributions DECIMAL(15, 2) DEFAULT 0.00,
    total_claims_paid DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chama_id, name)
);

-- Welfare Claims
CREATE TABLE IF NOT EXISTS welfare_claims (
    id TEXT PRIMARY KEY,
    welfare_fund_id TEXT NOT NULL REFERENCES welfare_funds(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    claim_type TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT NOT NULL,
    supporting_documents TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    approved_by TEXT,
    approval_date TIMESTAMP,
    payment_date TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Merry-Go-Round Cycles
CREATE TABLE IF NOT EXISTS mgr_cycles (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    account_id TEXT NOT NULL REFERENCES chama_accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    cycle_amount DECIMAL(15, 2) NOT NULL,
    contribution_amount DECIMAL(15, 2) NOT NULL,
    frequency TEXT NOT NULL, -- daily, weekly, monthly
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, active, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Merry-Go-Round Participants
CREATE TABLE IF NOT EXISTS mgr_participants (
    id TEXT PRIMARY KEY,
    cycle_id TEXT NOT NULL REFERENCES mgr_cycles(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    position INTEGER NOT NULL, -- order of receiving funds
    received_payout BOOLEAN DEFAULT FALSE,
    payout_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cycle_id, member_id),
    UNIQUE(cycle_id, position)
);

-- Merry-Go-Round Contributions
CREATE TABLE IF NOT EXISTS mgr_contributions (
    id TEXT PRIMARY KEY,
    cycle_id TEXT NOT NULL REFERENCES mgr_cycles(id) ON DELETE CASCADE,
    participant_id TEXT NOT NULL REFERENCES mgr_participants(id) ON DELETE CASCADE,
    contribution_amount DECIMAL(15, 2) NOT NULL,
    contribution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, late
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shares Configuration
CREATE TABLE IF NOT EXISTS shares_config (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    share_value DECIMAL(15, 2) NOT NULL,
    min_shares_per_member INTEGER NOT NULL DEFAULT 1,
    max_shares_per_member INTEGER,
    dividend_frequency TEXT, -- monthly, quarterly, annually
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chama_id)
);

-- Member Shares
CREATE TABLE IF NOT EXISTS member_shares (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shares_count INTEGER NOT NULL DEFAULT 0,
    total_value DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chama_id, member_id)
);

-- Share Transactions (purchases, sales, transfers)
CREATE TABLE IF NOT EXISTS share_transactions (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL, -- purchase, sale, transfer
    shares_count INTEGER NOT NULL,
    share_price DECIMAL(15, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    recipient_id TEXT REFERENCES users(id) ON DELETE SET NULL, -- for transfers
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dividends
CREATE TABLE IF NOT EXISTS dividends (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    total_amount DECIMAL(15, 2) NOT NULL,
    dividend_per_share DECIMAL(15, 4) NOT NULL,
    declaration_date TIMESTAMP NOT NULL,
    payment_date TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'declared', -- declared, processing, paid
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Member Dividend Payments
CREATE TABLE IF NOT EXISTS dividend_payments (
    id TEXT PRIMARY KEY,
    dividend_id TEXT NOT NULL REFERENCES dividends(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shares_count INTEGER NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    payment_date TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(dividend_id, member_id)
);

-- Meetings
CREATE TABLE IF NOT EXISTS meetings (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    meeting_date TIMESTAMP NOT NULL,
    location TEXT,
    meeting_type TEXT NOT NULL, -- regular, emergency, agm
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_meeting_link TEXT,
    status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, ongoing, completed, cancelled
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meeting Agenda Items
CREATE TABLE IF NOT EXISTS meeting_agenda (
    id TEXT PRIMARY KEY,
    meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    presenter_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meeting Attendance
CREATE TABLE IF NOT EXISTS meeting_attendance (
    id TEXT PRIMARY KEY,
    meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    attendance_status TEXT NOT NULL DEFAULT 'pending', -- pending, present, absent, excused
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(meeting_id, member_id)
);

-- Meeting Minutes
CREATE TABLE IF NOT EXISTS meeting_minutes (
    id TEXT PRIMARY KEY,
    meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    recorded_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group Goals/Projects
CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    chama_id TEXT NOT NULL REFERENCES chamas(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    target_amount DECIMAL(15, 2) NOT NULL,
    current_amount DECIMAL(15, 2) DEFAULT 0.00,
    start_date TIMESTAMP NOT NULL,
    target_date TIMESTAMP NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- active, achieved, cancelled
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goal Contributions
CREATE TABLE IF NOT EXISTS goal_contributions (
    id TEXT PRIMARY KEY,
    goal_id TEXT NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    member_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    contribution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Noticeboard Posts
CREATE TABLE IF NOT EXISTS noticeboard_posts (
    id TEXT PRIMARY KEY,
    chama_id TEXT REFERENCES chamas(id) ON DELETE CASCADE, -- NULL for system-wide notices
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    chama_id TEXT REFERENCES chamas(id) ON DELETE CASCADE, -- NULL for direct messages
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id TEXT REFERENCES users(id) ON DELETE CASCADE, -- NULL for group messages
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- system, chama, meeting, payment, etc.
    related_id TEXT, -- Could be chama_id, meeting_id, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Resources
CREATE TABLE IF NOT EXISTS educational_resources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content_type TEXT NOT NULL, -- article, video, document, course
    content_url TEXT,
    content TEXT, -- For articles or other text content
    is_premium BOOLEAN DEFAULT FALSE,
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Learning Progress
CREATE TABLE IF NOT EXISTS learning_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_id TEXT NOT NULL REFERENCES educational_resources(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, resource_id)
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    monthly_price DECIMAL(10, 2) NOT NULL,
    annual_price DECIMAL(10, 2) NOT NULL,
    features JSON NOT NULL, -- Features as JSON data
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    chama_id TEXT REFERENCES chamas(id) ON DELETE CASCADE, -- NULL for user subscriptions
    plan_id TEXT NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    billing_cycle TEXT NOT NULL, -- monthly, annual
    status TEXT NOT NULL DEFAULT 'active', -- active, cancelled, expired
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id TEXT REFERENCES subscriptions(id) ON DELETE SET NULL,
    loan_id TEXT REFERENCES loans(id) ON DELETE SET NULL,
    contribution_id TEXT REFERENCES contributions(id) ON DELETE SET NULL,
    transaction_type TEXT NOT NULL, -- subscription, deposit, withdrawal, loan, contribution
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed
    payment_method TEXT,
    transaction_reference TEXT,
    payment_proof_url TEXT,
    metadata JSON,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Settings
CREATE TABLE IF NOT EXISTS system_settings (
    id TEXT PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL, -- user, chama, loan, etc.
    entity_id TEXT,
    old_values JSON,
    new_values JSON,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Feedback
CREATE TABLE IF NOT EXISTS user_feedback (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    feedback_type TEXT NOT NULL, -- suggestion, bug, complaint, praise
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, reviewed, addressed
    reviewed_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    review_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Chama indexes
CREATE INDEX idx_chamas_creator ON chamas(created_by);
CREATE INDEX idx_chama_members_chama ON chama_members(chama_id);
CREATE INDEX idx_chama_members_user ON chama_members(user_id);
CREATE INDEX idx_chamas_name ON chamas(name);

-- Financial indexes
CREATE INDEX idx_contributions_chama ON contributions(chama_id);
CREATE INDEX idx_contributions_member ON contributions(member_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- Loan indexes
CREATE INDEX idx_loans_borrower ON loans(borrower_id);
CREATE INDEX idx_loans_chama ON loans(chama_id);
CREATE INDEX idx_loan_applications_user ON loan_applications(user_id);
CREATE INDEX idx_loan_repayments_loan ON loan_repayments(loan_id);
CREATE INDEX idx_loans_status ON loans(status);

-- Welfare indexes
CREATE INDEX idx_welfare_claims_fund ON welfare_claims(welfare_fund_id);
CREATE INDEX idx_welfare_claims_member ON welfare_claims(member_id);

-- Meeting indexes
CREATE INDEX idx_meetings_chama ON meetings(chama_id);
CREATE INDEX idx_meeting_attendance_meeting ON meeting_attendance(meeting_id);
CREATE INDEX idx_meeting_attendance_member ON meeting_attendance(member_id);

-- Notification indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);

-- MGR indexes
CREATE INDEX idx_mgr_cycles_chama ON mgr_cycles(chama_id);
CREATE INDEX idx_mgr_participants_cycle ON mgr_participants(cycle_id);
CREATE INDEX idx_mgr_contributions_cycle ON mgr_contributions(cycle_id);

-- Shares indexes
CREATE INDEX idx_member_shares_chama ON member_shares(chama_id);
CREATE INDEX idx_member_shares_member ON member_shares(member_id);
CREATE INDEX idx_share_transactions_chama ON share_transactions(chama_id);
CREATE INDEX idx_share_transactions_member ON share_transactions(member_id);

-- Timestamp update triggers
CREATE TRIGGER update_users_modtime AFTER UPDATE ON users
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_chamas_modtime AFTER UPDATE ON chamas
BEGIN
    UPDATE chamas SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_chama_members_modtime AFTER UPDATE ON chama_members
BEGIN
    UPDATE chama_members SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_contributions_modtime AFTER UPDATE ON contributions
BEGIN
    UPDATE contributions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_loans_modtime AFTER UPDATE ON loans
BEGIN
    UPDATE loans SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_loan_applications_modtime AFTER UPDATE ON loan_applications
BEGIN
    UPDATE loan_applications SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_loan_repayments_modtime AFTER UPDATE ON loan_repayments
BEGIN
    UPDATE loan_repayments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_welfare_claims_modtime AFTER UPDATE ON welfare_claims
BEGIN
    UPDATE welfare_claims SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_member_shares_modtime AFTER UPDATE ON member_shares
BEGIN
    UPDATE member_shares SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_share_transactions_modtime AFTER UPDATE ON share_transactions
BEGIN
    UPDATE share_transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_meetings_modtime AFTER UPDATE ON meetings
BEGIN
    UPDATE meetings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_goals_modtime AFTER UPDATE ON goals
BEGIN
    UPDATE goals SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_transactions_modtime AFTER UPDATE ON transactions
BEGIN
    UPDATE transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_user_feedback_modtime AFTER UPDATE ON user_feedback
BEGIN
    UPDATE user_feedback SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_system_settings_modtime AFTER UPDATE ON system_settings
BEGIN
    UPDATE system_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_educational_resources_modtime AFTER UPDATE ON educational_resources
BEGIN
    UPDATE educational_resources SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Add full-text search support for searchable fields
CREATE VIRTUAL TABLE search_index USING fts5(
    user_id,
    chama_id,
    content,
    type
);

-- Add versioning for key tables
ALTER TABLE users ADD COLUMN version INTEGER DEFAULT 1;
ALTER TABLE chamas ADD COLUMN version INTEGER DEFAULT 1;
ALTER TABLE loans ADD COLUMN version INTEGER DEFAULT 1;

-- Add soft delete support
ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
ALTER TABLE chamas ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
ALTER TABLE loans ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;

-- Add notification preferences
CREATE TABLE notification_preferences (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add activity tracking
CREATE TABLE user_activities (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    details JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add authentication-related columns to users table
ALTER TABLE users ADD COLUMN password_hash TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN verification_token TEXT;
ALTER TABLE users ADD COLUMN last_login TIMESTAMP; 