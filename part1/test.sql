SELECT d.name, d.size, u.username
FROM Dogs as d
LEFT JOIN Users as u ON d.owner_id = u.user_id;

SELECT r.request_id, d.name, r.requested_time, r.duration_minutes, r.location, u.username
FROM WalkRequests AS r
JOIN Dogs AS d ON r.dog_id = d.dog_id
JOIN Users AS u ON d.owner_id = u.user_id
WHERE r.status = 'open';