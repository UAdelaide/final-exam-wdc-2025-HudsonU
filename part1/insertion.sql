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

INSERT INTO WalkApplications (request_id, walker_id, status) VALUES
(1, (SELECT user_id FROM Users WHERE username = 'bobwalker'), 'rejected'),
(2, (SELECT user_id FROM Users WHERE username = 'johndoe'), 'accepted'),
(3, (SELECT user_id FROM Users WHERE username = 'bobwalker'), 'accepted'),
(4, (SELECT user_id FROM Users WHERE username = 'johndoe'), 'pending'),
(5, (SELECT user_id FROM Users WHERE username = 'bobwalker'), 'rejected');

INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES
(1, (SELECT user_id FROM Users WHERE username = 'bobwalker'), (SELECT user_id FROM Users WHERE username = 'alice123'), 5, 'Great job! Max loved the walk.'),
(2, (SELECT user_id FROM Users WHERE username = 'johndoe'), (SELECT user_id FROM Users WHERE username = 'carol123'), 4, 'Thanks! Bella seemed happy.'),
(3,
 (SELECT user_id FROM Users WHERE username = 'bobwalker'),
 (SELECT user_id FROM Users WHERE username = 'timthedoglover'),
 5, 'Abra came back tired, excellent.'),
(4,
 (SELECT user_id FROM Users WHERE username = 'johndoe'),
 (SELECT user_id FROM Users WHERE username = 'timthedoglover'),
 3, 'Kadabra was okay, a bit restless.'),
(5,
 (SELECT user_id FROM Users WHERE username = 'bobwalker'),
 (SELECT user_id FROM Users WHERE username = 'timthedoglover'),
 4, 'Alakazam had a good time.');
