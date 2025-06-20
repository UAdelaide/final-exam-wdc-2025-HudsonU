SELECT d.name, d.size, u.username
FROM Dogs as d
LEFT JOIN Users as u ON d.owner_id = u.user_id;

SELECT r.request_id, d.name, r.requested_time, 


WHERE r.status = "open"