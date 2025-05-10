
-- Create users table for managing both Civic and Farcaster users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR,
  wallet_address VARCHAR,
  eth_balance NUMERIC(20, 18),  -- Store ETH balance with precision
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  farcaster_fid INTEGER,        -- Farcaster user ID
  farcaster_username VARCHAR,   -- Farcaster username
  auth_provider VARCHAR         -- 'civic' or 'farcaster'
);

-- Add RLS policies for the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own data
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy for users to update their own data
CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy for inserting new users (during signup)
CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
