USING DogWalkService;

INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('johndoe', 'john@example.com', 'password123', 'walker'),
('timthedoglover', 'tim@example.com', 'password456', 'owner');

INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'timethedoglover'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'timethedoglover'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'timethedoglover'), 'Max', 'medium');
INSERT INTO WalkRequests