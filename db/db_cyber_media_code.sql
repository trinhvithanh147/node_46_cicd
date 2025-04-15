CREATE TABLE cars(
	car_id INT PRIMARY KEY AUTO_INCREMENT,
	-- Tên xe, ví dụ: "Tesla Model S"
	`name` VARCHAR(255),
	-- Mô tả ngắn, ví dụ: "Free rechange at any station"
	description TEXT,
	-- Số lượng hành khách, ví dụ: 4
	passengers INT,
	-- Tốc độ tối đa với thời gian tăng tốc, ví dụ "100 km/h in 4 seconds"
	max_speed VARCHAR(255),
	-- Loại hộp số, ví dụ: "Automatic gearbox"
	gearbox_type VARCHAR(255),
	-- loại nhiên liệu, ví dụ "Electric"
	fuel_type VARCHAR(255),
	-- Gia thuê mỗi ngày, ví dụ 168.000
	price_per_day DOUBLE,
	-- tỷ lệ giảm giá, ví dụ: 25
	discount_percentage INT DEFAULT 0,
	-- URL hình ảnh xe
	image_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
INSERT INTO cars (
    `name`, 
    description, 
    passengers, 
    max_speed, 
    gearbox_type, 
    fuel_type, 
    price_per_day, 
    discount_percentage, 
    image_url
) 
VALUES 
-- Xe 6
(
    'Audi A6', 
    'Comfortable and stylish sedan', 
    5, 
    '240 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    250000, 
    20, 
    'https://example.com/audi-a6.jpg'
),
-- Xe 7
(
    'Honda Civic', 
    'Economical and practical', 
    5, 
    '200 km/h', 
    'Manual gearbox', 
    'Petrol', 
    110000, 
    10, 
    'https://example.com/honda-civic.jpg'
),
-- Xe 8
(
    'Chevrolet Camaro', 
    'Iconic muscle car', 
    4, 
    '280 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    320000, 
    30, 
    'https://example.com/chevrolet-camaro.jpg'
),
-- Xe 9
(
    'Nissan Leaf', 
    'Eco-friendly electric car', 
    5, 
    '150 km/h', 
    'Automatic gearbox', 
    'Electric', 
    95000, 
    5, 
    'https://example.com/nissan-leaf.jpg'
),
-- Xe 10
(
    'Mercedes-Benz E-Class', 
    'Luxury and performance combined', 
    5, 
    '250 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    400000, 
    25, 
    'https://example.com/mercedes-e-class.jpg'
),
-- Xe 11
(
    'Volkswagen Golf', 
    'Compact and versatile', 
    5, 
    '190 km/h', 
    'Manual gearbox', 
    'Diesel', 
    130000, 
    10, 
    'https://example.com/volkswagen-golf.jpg'
),
-- Xe 12
(
    'Porsche 911', 
    'High-performance sports car', 
    2, 
    '300 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    550000, 
    35, 
    'https://example.com/porsche-911.jpg'
),
-- Xe 13
(
    'Lexus RX 500h', 
    'Hybrid luxury SUV', 
    5, 
    '210 km/h', 
    'Automatic gearbox', 
    'Hybrid', 
    300000, 
    20, 
    'https://example.com/lexus-rx500h.jpg'
),
-- Xe 14
(
    'Toyota Camry', 
    'Reliable and comfortable sedan', 
    5, 
    '210 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    150000, 
    10, 
    'https://example.com/toyota-camry.jpg'
),
-- Xe 15
(
    'Ford F-150', 
    'Powerful and versatile pickup truck', 
    5, 
    '180 km/h', 
    'Automatic gearbox', 
    'Diesel', 
    250000, 
    20, 
    'https://example.com/ford-f150.jpg'
),
-- Xe 16
(
    'Jeep Wrangler', 
    'Off-road champion', 
    4, 
    '170 km/h', 
    'Manual gearbox', 
    'Petrol', 
    220000, 
    15, 
    'https://example.com/jeep-wrangler.jpg'
),
-- Xe 17
(
    'Kia Seltos', 
    'Compact SUV with modern features', 
    5, 
    '190 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    140000, 
    5, 
    'https://example.com/kia-seltos.jpg'
),
-- Xe 18
(
    'Mazda CX-5', 
    'Sporty and spacious SUV', 
    5, 
    '200 km/h', 
    'Automatic gearbox', 
    'Diesel', 
    160000, 
    10, 
    'https://example.com/mazda-cx5.jpg'
),
-- Xe 19
(
    'Hyundai Tucson', 
    'Affordable and tech-savvy SUV', 
    5, 
    '185 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    155000, 
    8, 
    'https://example.com/hyundai-tucson.jpg'
),
-- Xe 20
(
    'Subaru Outback', 
    'Adventure-ready wagon', 
    5, 
    '195 km/h', 
    'Manual gearbox', 
    'Diesel', 
    170000, 
    12, 
    'https://example.com/subaru-outback.jpg'
),
-- Xe 21
(
    'Volvo XC90', 
    'Luxury and safety-focused SUV', 
    7, 
    '220 km/h', 
    'Automatic gearbox', 
    'Hybrid', 
    400000, 
    25, 
    'https://example.com/volvo-xc90.jpg'
),
-- Xe 22
(
    'Peugeot 3008', 
    'Stylish and innovative crossover', 
    5, 
    '205 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    180000, 
    10, 
    'https://example.com/peugeot-3008.jpg'
),
-- Xe 23
(
    'Renault Koleos', 
    'Spacious and elegant SUV', 
    5, 
    '200 km/h', 
    'Automatic gearbox', 
    'Diesel', 
    175000, 
    8, 
    'https://example.com/renault-koleos.jpg'
),
-- Xe 24
(
    'Tesla Model X', 
    'Luxury electric SUV with falcon doors', 
    7, 
    '250 km/h', 
    'Automatic gearbox', 
    'Electric', 
    500000, 
    30, 
    'https://example.com/tesla-model-x.jpg'
),
-- Xe 25
(
    'BMW i3', 
    'Compact urban electric car', 
    4, 
    '150 km/h', 
    'Automatic gearbox', 
    'Electric', 
    120000, 
    5, 
    'https://example.com/bmw-i3.jpg'
),
-- Xe 26
(
    'Chevrolet Tahoe', 
    'Full-size SUV with plenty of space', 
    8, 
    '190 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    350000, 
    20, 
    'https://example.com/chevrolet-tahoe.jpg'
),
-- Xe 27
(
    'Lamborghini Urus', 
    'Super SUV with extreme performance', 
    5, 
    '305 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    1200000, 
    40, 
    'https://example.com/lamborghini-urus.jpg'
),
-- Xe 28
(
    'Rolls-Royce Phantom', 
    'The pinnacle of luxury sedans', 
    5, 
    '250 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    3000000, 
    50, 
    'https://example.com/rolls-royce-phantom.jpg'
),
-- Xe 29
(
    'Mini Cooper S', 
    'Small but powerful hatchback', 
    4, 
    '230 km/h', 
    'Manual gearbox', 
    'Petrol', 
    190000, 
    15, 
    'https://example.com/mini-cooper-s.jpg'
),
-- Xe 30
(
    'Jaguar F-Type', 
    'Stunning and sporty coupe', 
    2, 
    '300 km/h', 
    'Automatic gearbox', 
    'Petrol', 
    600000, 
    30, 
    'https://example.com/jaguar-ftype.jpg'
);