SELECT d.name, d.size, u.username
FROM Dogs as d
LEFT JOIN Users as u ON d.owner_id = u.user_id;

SELECT


WHERE r.status = "open"