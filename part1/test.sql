SELECT d.name, d.size, u.username
FROM Dogs as d
LEFT JOIN Users as u ON d.owner_id = u.user_id;

SELECT r.request_id, d.name, r.requested_time, r.duration_minutes, r.location, u.username
FROM WalkRequests AS r
JOIN Dogs AS d ON r.dog_id = d.dog_id
JOIN Users AS u ON d.owner_id = u.user_id
WHERE r.status = 'open';

SELECT u.username AS walker_username, COUNT(DISTINCT wr.request_id) AS completed_walks, COUNT(r.rating_id) AS total_ratings, ROUND(AVG(r.rating), 1) AS average_rating
FROM Users u
LEFT JOIN WalkRequests wr ON u.user_id = (
  SELECT wa.walker_id
  FROM WalkApplications wa
  WHERE wa.request_id = wr.request_id AND wa.status = 'accepted'
  LIMIT 1
)
LEFT JOIN WalkRatings r ON u.user_id = r.walker_id AND wr.request_id = r.request_id
WHERE u.role = 'walker' AND wr.status = 'completed'
GROUP BY u.user_id, u.username;
