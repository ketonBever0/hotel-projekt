-- Foglalási statisztika szobatípus szerint (mennyiség, maxbevétel, átlagbevétel)
SELECT t.name, COUNT(r.id) AS quantity, MAX(f.price) AS maxPrice, ROUND(AVG(f.price)) AS averagePrice FROM reservations f
JOIN rooms r ON f.room_id = r.id
RIGHT JOIN room_types t ON r.room_type_id = t.id
GROUP BY t.name
ORDER BY 2 DESC;

-- Lekérdezi a szobatípusokat, illetve megszámolja a használható szobákat típusonként
SELECT t.id, t.name, t.bedrooms, t.single_beds AS singleBeds, t.double_beds AS doubleBeds, t.baby_beds AS babyBeds, t.description, t.daily_price AS dailyPrice, COUNT(r.id)
FROM room_types AS t JOIN rooms AS r ON t.id = r.room_type_id
WHERE r.is_in_order = 1
GROUP BY t.id;

-- Lekérdezi, hogy van-e elérhető szoba a megadott szobatípusból.
-- Egy szoba akkor elérhető, ha a megadott kezdő- és végdátum között
-- nincs foglalva, illetve üzemben van.
SET @start_date = ?
SET @end_date = ?;
SET @room_type_id = ?;
SELECT IF(
	(SELECT COUNT(*)
		FROM (
			SELECT r.id, r.room_number, f.start_date, f.end_date
			FROM rooms AS r
			LEFT JOIN reservations AS F ON f.room_id = r.id
			JOIN room_types AS t ON r.room_type_id = t.id
			WHERE t.id = @room_type_id AND r.is_in_order = TRUE
			AND @start_date NOT BETWEEN f.start_date AND f.end_date
			AND f.start_date NOT BETWEEN @start_date AND @end_date
			AND @end_date NOT BETWEEN f.start_date AND f.end_date
			AND f.end_date NOT BETWEEN @start_date AND @end_date
			OR ISNULL(f.start_date) AND ISNULL(f.end_date)
			) AS sub
	) > 0,
	TRUE,
	FALSE
) AS available;