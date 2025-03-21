CREATE TABLE IF NOT EXISTS users (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  Username VARCHAR(50) UNIQUE NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  ProfilePicture VARCHAR(255),
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(Email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(Username);

CREATE TABLE IF NOT EXISTS templates (
  TemplateID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) UNIQUE NOT NULL,
  Description TEXT,
  ImageURL VARCHAR(255),
  IsFeatured INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_templates_title ON templates(Title);

CREATE TABLE IF NOT EXISTS projects (
  ProjectID INTEGER PRIMARY KEY AUTOINCREMENT,
  UserID INTEGER NOT NULL,
  TemplateID INTEGER NOT NULL,
  Title VARCHAR(100) NOT NULL,
  Status TEXT CHECK(Status IN ('in-progress', 'completed')) NOT NULL DEFAULT 'in-progress',
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (TemplateID) REFERENCES templates(TemplateID) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_projects_userid_title ON projects(UserID, Title);

CREATE TABLE IF NOT EXISTS collaborations (
  CollaborationID INTEGER PRIMARY KEY AUTOINCREMENT,
  ProjectID INTEGER NOT NULL,
  InvitedUserEmail VARCHAR(100) NOT NULL,
  Status TEXT CHECK(Status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ProjectID) REFERENCES projects(ProjectID) ON DELETE CASCADE,
  FOREIGN KEY (InvitedUserEmail) REFERENCES users(Email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_collaborations_projectid ON collaborations(ProjectID);
CREATE INDEX IF NOT EXISTS idx_collaborations_invitedemail ON collaborations(InvitedUserEmail);