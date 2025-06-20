USE DogWalkService;

INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('johndoe', 'john@example.com', 'password123', 'walker'),
('timthedoglover', 'tim@example.com', 'password456', 'owner');

INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'timthedoglover'), 'Abra', 'large'),
((SELECT user_id FROM Users WHERE username = 'timthedoglover'), 'Kadabra', 'large'),
((SELECT user_id FROM Users WHERE username = 'timthedoglover'), 'Alakazam', 'large');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'), "2025-06-10 08:00:00", 30, "Parklands", "open"),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), "2025-06-10 09:30:00", 45, "Beachside Ave", "accepted"),
((SELECT dog_id FROM Dogs WHERE name = 'Abra'), "2025-05-11 08:00:00", 60, "Candylane Ln", "completed"),
((SELECT dog_id FROM Dogs WHERE name = 'Kadabra'), "2025-06-12 08:00:00", 60, "Candylane Ln", "open"),
((SELECT dog_id FROM Dogs WHERE name = 'Alakazam'), "2025-06-13 08:00:00", 45, "Candylane Ln", "cancelled");