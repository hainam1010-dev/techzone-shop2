export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  stock: number;
  warranty: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'cat-1', name: 'Card màn hình', slug: 'gpu', image: '/images/products/gpu-rtx4070s.jpg', count: 4 },
  { id: 'cat-2', name: 'CPU', slug: 'cpu', image: '/images/products/cpu-i7.jpg', count: 4 },
  { id: 'cat-3', name: 'Mainboard', slug: 'motherboard', image: '/images/products/mb-asus.jpg', count: 3 },
  { id: 'cat-4', name: 'RAM', slug: 'ram', image: '/images/products/ram-corsair.jpg', count: 3 },
  { id: 'cat-5', name: 'SSD', slug: 'ssd', image: '/images/products/ssd-samsung.jpg', count: 3 },
  { id: 'cat-6', name: 'Màn hình', slug: 'monitor', image: '/images/products/monitor-lg.jpg', count: 3 },
  { id: 'cat-7', name: 'Bàn phím', slug: 'keyboard', image: '/images/products/kb-logitech.jpg', count: 3 },
  { id: 'cat-8', name: 'Chuột', slug: 'mouse', image: '/images/products/mouse-logitech.jpg', count: 3 },
  { id: 'cat-9', name: 'Tai nghe', slug: 'headset', image: '/images/products/headset-hyperx.jpg', count: 3 },
  { id: 'cat-10', name: 'Nguồn', slug: 'psu', image: '/images/products/psu-corsair.jpg', count: 2 },
  { id: 'cat-11', name: 'Case', slug: 'case', image: '/images/products/case-nzxt.jpg', count: 2 },
  { id: 'cat-12', name: 'Tản nhiệt', slug: 'cooler', image: '/images/products/cooler-nzxt.jpg', count: 2 },
];

export const products: Product[] = [
  // GPU
  {
    id: 'gpu-001',
    code: 'GPU001',
    name: 'NVIDIA RTX 4060 - 8GB',
    category: 'gpu',
    subcategory: 'Card màn hình',
    price: 8990000,
    originalPrice: 9990000,
    image: '/images/products/gpu-rtx4060.jpg',
    description: 'Card đồ họa NVIDIA GeForce RTX 4060 với 8GB GDDR6, hỗ trợ DLSS 3 và ray tracing. Hiệu năng gaming 1080p tuyệt vờ, tiết kiệm điện năng với kiến trúc Ada Lovelace.',
    specs: { 'Bộ nhớ': '8GB GDDR6', 'Bus': '128-bit', 'CUDA Cores': '3072', 'Boost Clock': '2.46 GHz', 'TDP': '115W', 'Kết nối': 'PCIe 4.0 x8' },
    stock: 25, warranty: '36 tháng', rating: 4.5, reviews: 128, badge: 'Bán chạy'
  },
  {
    id: 'gpu-002',
    code: 'GPU002',
    name: 'NVIDIA RTX 4070 Super - 12GB',
    category: 'gpu',
    subcategory: 'Card màn hình',
    price: 16990000,
    originalPrice: 18990000,
    image: '/images/products/gpu-rtx4070s.jpg',
    description: 'RTX 4070 Super với 12GB GDDR6X, hiệu năng vượt trội cho gaming 1440p. Hỗ trợ đầy đủ DLSS 3, Frame Generation và ray tracing thế hệ mới.',
    specs: { 'Bộ nhớ': '12GB GDDR6X', 'Bus': '192-bit', 'CUDA Cores': '7168', 'Boost Clock': '2.48 GHz', 'TDP': '220W', 'Kết nối': 'PCIe 4.0 x16' },
    stock: 15, warranty: '36 tháng', rating: 4.7, reviews: 89, badge: 'Hot'
  },
  {
    id: 'gpu-003',
    code: 'GPU003',
    name: 'NVIDIA RTX 5070 - 12GB',
    category: 'gpu',
    subcategory: 'Card màn hình',
    price: 20990000,
    originalPrice: 22990000,
    image: '/images/products/gpu-rtx5070.jpg',
    description: 'Thế hệ RTX 50 series mới nhất với kiến trúc Blackwell. Hiệu năng đỉnh cao cho gaming 4K, hỗ trợ DLSS 4 và Multi Frame Generation.',
    specs: { 'Bộ nhớ': '12GB GDDR7', 'Bus': '192-bit', 'CUDA Cores': '7680', 'Boost Clock': '2.65 GHz', 'TDP': '250W', 'Kết nối': 'PCIe 5.0 x16' },
    stock: 8, warranty: '36 tháng', rating: 4.9, reviews: 45, badge: 'Mới'
  },
  {
    id: 'gpu-004',
    code: 'GPU004',
    name: 'AMD RX 7700 XT - 12GB',
    category: 'gpu',
    subcategory: 'Card màn hình',
    price: 12990000,
    originalPrice: 13990000,
    image: '/images/products/gpu-rx7700xt.jpg',
    description: 'AMD Radeon RX 7700 XT với 12GB GDDR6, kiến trúc RDNA 3. Hiệu năng gaming 1440p xuất sắc, hỗ trợ FSR 3 và AFMF.',
    specs: { 'Bộ nhớ': '12GB GDDR6', 'Bus': '192-bit', 'Stream Processors': '3456', 'Boost Clock': '2.58 GHz', 'TDP': '245W', 'Kết nối': 'PCIe 4.0 x16' },
    stock: 12, warranty: '36 tháng', rating: 4.6, reviews: 67
  },
  // CPU
  {
    id: 'cpu-001',
    code: 'CPU001',
    name: 'Intel Core i5-14600K',
    category: 'cpu',
    subcategory: 'CPU',
    price: 8490000,
    originalPrice: 9290000,
    image: '/images/products/cpu-i5.jpg',
    description: 'Intel Core i5-14600K thế hệ 14, 14 nhân 20 luồng. Hiệu năng gaming và đa nhiệm tuyệt vờ, hỗ trợ DDR5 và PCIe 5.0.',
    specs: { 'Nhân/Luồng': '14/20', 'Xung cơ bản': '3.5 GHz', 'Xung tối đa': '5.3 GHz', 'Cache': '24MB', 'Socket': 'LGA 1700', 'TDP': '125W' },
    stock: 20, warranty: '36 tháng', rating: 4.6, reviews: 156
  },
  {
    id: 'cpu-002',
    code: 'CPU002',
    name: 'Intel Core i7-14700K',
    category: 'cpu',
    subcategory: 'CPU',
    price: 12990000,
    originalPrice: 13990000,
    image: '/images/products/cpu-i7.jpg',
    description: 'Intel Core i7-14700K, 20 nhân 28 luồng. Hiệu năng đỉnh cao cho gaming, streaming và công việc sáng tạo.',
    specs: { 'Nhân/Luồng': '20/28', 'Xung cơ bản': '3.4 GHz', 'Xung tối đa': '5.6 GHz', 'Cache': '33MB', 'Socket': 'LGA 1700', 'TDP': '125W' },
    stock: 18, warranty: '36 tháng', rating: 4.8, reviews: 112, badge: 'Hot'
  },
  {
    id: 'cpu-003',
    code: 'CPU003',
    name: 'AMD Ryzen 5 7600X',
    category: 'cpu',
    subcategory: 'CPU',
    price: 6990000,
    originalPrice: 7690000,
    image: '/images/products/cpu-r5.jpg',
    description: 'AMD Ryzen 5 7600X, 6 nhân 12 luồng trên kiến trúc Zen 4. Hiệu năng gaming tuyệt vờ với xung cao, hỗ trợ DDR5 và PCIe 5.0.',
    specs: { 'Nhân/Luồng': '6/12', 'Xung cơ bản': '4.7 GHz', 'Xung tối đa': '5.3 GHz', 'Cache': '38MB', 'Socket': 'AM5', 'TDP': '105W' },
    stock: 22, warranty: '36 tháng', rating: 4.5, reviews: 98
  },
  {
    id: 'cpu-004',
    code: 'CPU004',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    subcategory: 'CPU',
    price: 10990000,
    originalPrice: 11990000,
    image: '/images/products/cpu-r7.jpg',
    description: 'CPU gaming nhanh nhất thế giớ với công nghệ 3D V-Cache. 8 nhân 16 luồng, hiệu năng gaming vượt trội mọi đối thủ.',
    specs: { 'Nhân/Luồng': '8/16', 'Xung cơ bản': '4.2 GHz', 'Xung tối đa': '5.0 GHz', 'Cache': '96MB', 'Socket': 'AM5', 'TDP': '120W' },
    stock: 10, warranty: '36 tháng', rating: 4.9, reviews: 203, badge: 'Bán chạy'
  },
  // Mainboard
  {
    id: 'mb-001',
    code: 'MB001',
    name: 'ASUS ROG STRIX B760-F Gaming WiFi',
    category: 'motherboard',
    subcategory: 'Mainboard',
    price: 6490000,
    originalPrice: 6990000,
    image: '/images/products/mb-asus.jpg',
    description: 'Mainboard gaming cao cấp cho Intel thế hệ 12/13/14. Hỗ trợ DDR5, WiFi 6E, PCIe 5.0 và hệ thống tản nhiệt tuyệt vờ.',
    specs: { 'Socket': 'LGA 1700', 'Chipset': 'B760', 'RAM': 'DDR5 7800MHz', 'Khe M.2': '4x', 'WiFi': 'WiFi 6E', 'Form factor': 'ATX' },
    stock: 15, warranty: '36 tháng', rating: 4.7, reviews: 76
  },
  {
    id: 'mb-002',
    code: 'MB002',
    name: 'MSI MAG B650 Tomahawk WiFi',
    category: 'motherboard',
    subcategory: 'Mainboard',
    price: 5890000,
    originalPrice: 6390000,
    image: '/images/products/mb-msi.jpg',
    description: 'Mainboard MSI Tomahawk đáng tin cậy cho Ryzen 7000 series. Hỗ trợ DDR5, WiFi 6E và hệ thống VRM mạnh mẽ.',
    specs: { 'Socket': 'AM5', 'Chipset': 'B650', 'RAM': 'DDR5 6400MHz', 'Khe M.2': '3x', 'WiFi': 'WiFi 6E', 'Form factor': 'ATX' },
    stock: 18, warranty: '36 tháng', rating: 4.6, reviews: 89
  },
  {
    id: 'mb-003',
    code: 'MB003',
    name: 'Gigabyte B760 Aorus Elite AX',
    category: 'motherboard',
    subcategory: 'Mainboard',
    price: 5590000,
    originalPrice: 5990000,
    image: '/images/products/mb-gigabyte.jpg',
    description: 'Mainboard Gigabyte Aorus với thiết kế tản nhiệt cao cấp, hỗ trợ Intel thế hệ 12/13/14, DDR5 và nhiều tính năng gaming.',
    specs: { 'Socket': 'LGA 1700', 'Chipset': 'B760', 'RAM': 'DDR5 7600MHz', 'Khe M.2': '3x', 'WiFi': 'WiFi 6E', 'Form factor': 'ATX' },
    stock: 14, warranty: '36 tháng', rating: 4.5, reviews: 54
  },
  // RAM
  {
    id: 'ram-001',
    code: 'RAM001',
    name: 'Corsair Vengeance DDR5 32GB 6000MHz',
    category: 'ram',
    subcategory: 'RAM',
    price: 3290000,
    originalPrice: 3690000,
    image: '/images/products/ram-corsair.jpg',
    description: 'Kit RAM DDR5 32GB (2x16GB) bus 6000MHz với RGB động. Hiệu năng cao, tương thích Intel XMP 3.0 và AMD EXPO.',
    specs: { 'Dung lượng': '32GB (2x16GB)', 'Bus': 'DDR5 6000MHz', 'Timing': 'CL36', 'Điện áp': '1.35V', 'RGB': 'Có', 'Profile': 'XMP 3.0 / EXPO' },
    stock: 30, warranty: '36 tháng', rating: 4.7, reviews: 145, badge: 'Bán chạy'
  },
  {
    id: 'ram-002',
    code: 'RAM002',
    name: 'G.Skill Trident Z5 RGB 32GB DDR5',
    category: 'ram',
    subcategory: 'RAM',
    price: 3590000,
    originalPrice: 3990000,
    image: '/images/products/ram-gskill.jpg',
    description: 'G.Skill Trident Z5 RGB 32GB DDR5 6400MHz. Thiết kế đẹp mắt, hiệu năng đỉnh cao cho gaming và sáng tạo nội dung.',
    specs: { 'Dung lượng': '32GB (2x16GB)', 'Bus': 'DDR5 6400MHz', 'Timing': 'CL32', 'Điện áp': '1.40V', 'RGB': 'Có', 'Profile': 'XMP 3.0' },
    stock: 25, warranty: '36 tháng', rating: 4.8, reviews: 98
  },
  {
    id: 'ram-003',
    code: 'RAM003',
    name: 'Kingston Fury Beast 16GB DDR5',
    category: 'ram',
    subcategory: 'RAM',
    price: 1490000,
    originalPrice: 1690000,
    image: '/images/products/ram-kingston.jpg',
    description: 'Kingston Fury Beast 16GB DDR5 5200MHz. Giải pháp RAM DDR5 giá rẻ, hiệu năng ổn định cho mọi nhu cầu.',
    specs: { 'Dung lượng': '16GB (1x16GB)', 'Bus': 'DDR5 5200MHz', 'Timing': 'CL40', 'Điện áp': '1.25V', 'RGB': 'Không', 'Profile': 'XMP 3.0' },
    stock: 40, warranty: '36 tháng', rating: 4.4, reviews: 187
  },
  // SSD
  {
    id: 'ssd-001',
    code: 'SSD001',
    name: 'Samsung 990 Pro 1TB NVMe',
    category: 'ssd',
    subcategory: 'SSD',
    price: 2990000,
    originalPrice: 3390000,
    image: '/images/products/ssd-samsung.jpg',
    description: 'SSD NVMe PCIe 4.0 tốc độ cao nhất thế giớ. Đọc 7450MB/s, ghi 6900MB/s. Controller Samsung Pascal in-house.',
    specs: { 'Dung lượng': '1TB', 'Giao tiếp': 'PCIe 4.0 x4 NVMe', 'Đọc tuần tự': '7450 MB/s', 'Ghi tuần tự': '6900 MB/s', 'TBW': '600TB', 'Bảo hành': '5 năm' },
    stock: 35, warranty: '60 tháng', rating: 4.9, reviews: 234, badge: 'Hot'
  },
  {
    id: 'ssd-002',
    code: 'SSD002',
    name: 'Kingston KC3000 1TB NVMe',
    category: 'ssd',
    subcategory: 'SSD',
    price: 2190000,
    originalPrice: 2490000,
    image: '/images/products/ssd-kingston.jpg',
    description: 'SSD NVMe PCIe 4.0 hiệu năng cao với heatsink graphene. Đọc 7000MB/s, ghi 6000MB/s. Giá cực tốt.',
    specs: { 'Dung lượng': '1TB', 'Giao tiếp': 'PCIe 4.0 x4 NVMe', 'Đọc tuần tự': '7000 MB/s', 'Ghi tuần tự': '6000 MB/s', 'TBW': '800TB', 'Bảo hành': '5 năm' },
    stock: 28, warranty: '60 tháng', rating: 4.6, reviews: 156
  },
  {
    id: 'ssd-003',
    code: 'SSD003',
    name: 'WD Black SN850X 1TB',
    category: 'ssd',
    subcategory: 'SSD',
    price: 2590000,
    originalPrice: 2890000,
    image: '/images/products/ssd-wd.jpg',
    description: 'WD Black SN850X - SSD gaming hàng đầu. Tốc độ đọc 7300MB/s, hỗ trợ Game Mode 2.0 tối ưu hiệu năng.',
    specs: { 'Dung lượng': '1TB', 'Giao tiếp': 'PCIe 4.0 x4 NVMe', 'Đọc tuần tự': '7300 MB/s', 'Ghi tuần tự': '6300 MB/s', 'TBW': '600TB', 'Bảo hành': '5 năm' },
    stock: 22, warranty: '60 tháng', rating: 4.7, reviews: 178
  },
  // Monitor
  {
    id: 'mon-001',
    code: 'MON001',
    name: 'LG UltraGear 27GP850-B 27" 165Hz',
    category: 'monitor',
    subcategory: 'Màn hình',
    price: 6990000,
    originalPrice: 7990000,
    image: '/images/products/monitor-lg.jpg',
    description: 'Màn hình gaming 27 inch 2K, IPS 165Hz, 1ms GtG. Hỗ trợ G-Sync Compatible và FreeSync Premium. Màu sắc chính xác 98% DCI-P3.',
    specs: { 'Kích thước': '27 inch', 'Độ phân giải': '2560x1440', 'Tấm nền': 'IPS', 'Tần số': '165Hz', 'Thờ gian phản hồi': '1ms GtG', 'HDR': 'HDR400' },
    stock: 12, warranty: '24 tháng', rating: 4.7, reviews: 89
  },
  {
    id: 'mon-002',
    code: 'MON002',
    name: 'ASUS TUF VG27AQ3A 27" 180Hz',
    category: 'monitor',
    subcategory: 'Màn hình',
    price: 5990000,
    originalPrice: 6790000,
    image: '/images/products/monitor-asus.jpg',
    description: 'Màn hình gaming 27 inch 2K 180Hz, Fast IPS. ELMB Sync, Shadow Boost, hỗ trợ đầy đủ Adaptive Sync.',
    specs: { 'Kích thước': '27 inch', 'Độ phân giải': '2560x1440', 'Tấm nền': 'Fast IPS', 'Tần số': '180Hz', 'Thờ gian phản hồi': '1ms GTG', 'HDR': 'HDR10' },
    stock: 15, warranty: '36 tháng', rating: 4.6, reviews: 67
  },
  {
    id: 'mon-003',
    code: 'MON003',
    name: 'Samsung Odyssey G5 32" 165Hz',
    category: 'monitor',
    subcategory: 'Màn hình',
    price: 7990000,
    originalPrice: 8990000,
    image: '/images/products/monitor-samsung.jpg',
    description: 'Màn hình cong 32 inch 2K 165Hz, độ cong 1000R. Trải nghiệm gaming đắm chìm với HDR10 và AMD FreeSync Premium.',
    specs: { 'Kích thước': '32 inch', 'Độ phân giải': '2560x1440', 'Tấm nền': 'VA Cong', 'Tần số': '165Hz', 'Độ cong': '1000R', 'HDR': 'HDR10' },
    stock: 8, warranty: '24 tháng', rating: 4.5, reviews: 45
  },
  // Keyboard
  {
    id: 'kb-001',
    code: 'KB001',
    name: 'Logitech G Pro X TKL',
    category: 'keyboard',
    subcategory: 'Bàn phím',
    price: 2990000,
    originalPrice: 3290000,
    image: '/images/products/kb-logitech.jpg',
    description: 'Bàn phím cơ TKL chuyên esports với switch GX Blue clicky. Thiết kế không dây LIGHTSPEED, độ trễ 1ms.',
    specs: { 'Layout': 'TKL (87 phím)', 'Switch': 'GX Blue Clicky', 'Kết nối': 'USB-C / Wireless', 'Pin': '50 giờ', 'RGB': 'LIGHTSYNC', 'Keycap': 'PBT Double-shot' },
    stock: 20, warranty: '24 tháng', rating: 4.7, reviews: 134
  },
  {
    id: 'kb-002',
    code: 'KB002',
    name: 'Akko 5075B Plus',
    category: 'keyboard',
    subcategory: 'Bàn phím',
    price: 1790000,
    originalPrice: 1990000,
    image: '/images/products/kb-akko.jpg',
    description: 'Bàn phím cơ 75% hot-swappable, south-facing LED. Switch CS Crystal, keycap PBT dye-sub chất lượng cao.',
    specs: { 'Layout': '75% (82 phím)', 'Switch': 'CS Crystal', 'Kết nối': 'USB-C / Bluetooth / 2.4G', 'Hot-swap': 'Có (3-pin/5-pin)', 'Keycap': 'PBT Dye-sub', 'Foam': 'Đầy đủ' },
    stock: 18, warranty: '12 tháng', rating: 4.5, reviews: 89
  },
  {
    id: 'kb-003',
    code: 'KB003',
    name: 'Keychron K8 Pro',
    category: 'keyboard',
    subcategory: 'Bàn phím',
    price: 2490000,
    originalPrice: 2790000,
    image: '/images/products/kb-keychron.jpg',
    description: 'Bàn phím cơ TKL QMK/VIA programmable. Hot-swappable, hỗ trợ Mac/Windows. Switch Gateron G Pro.',
    specs: { 'Layout': 'TKL (87 phím)', 'Switch': 'Gateron G Pro Brown', 'Kết nối': 'USB-C / Bluetooth', 'Hot-swap': 'Có', 'Keycap': 'PBTOSA', 'Programmable': 'QMK/VIA' },
    stock: 15, warranty: '12 tháng', rating: 4.6, reviews: 76
  },
  // Mouse
  {
    id: 'mouse-001',
    code: 'MOU001',
    name: 'Logitech G Pro X Superlight 2',
    category: 'mouse',
    subcategory: 'Chuột',
    price: 3290000,
    originalPrice: 3690000,
    image: '/images/products/mouse-logitech.jpg',
    description: 'Chuột gaming không dây siêu nhẹ 60g. Sensor HERO 2 25K DPI, polling rate 2000Hz. Pin 95 giờ.',
    specs: { 'Cân nặng': '60g', 'Sensor': 'HERO 2 (25K DPI)', 'Polling rate': '2000Hz', 'Kết nối': 'LIGHTSPEED', 'Pin': '95 giờ', 'Switch': 'LIGHTFORCE Hybrid' },
    stock: 22, warranty: '24 tháng', rating: 4.9, reviews: 198, badge: 'Bán chạy'
  },
  {
    id: 'mouse-002',
    code: 'MOU002',
    name: 'Razer DeathAdder V3 Pro',
    category: 'mouse',
    subcategory: 'Chuột',
    price: 3590000,
    originalPrice: 3990000,
    image: '/images/products/mouse-razer.jpg',
    description: 'Chuột gaming ergonomic không dây 63g. Sensor Focus Pro 30K, optical switch gen-3, pin 90 giờ.',
    specs: { 'Cân nặng': '63g', 'Sensor': 'Focus Pro 30K', 'Polling rate': '4000Hz', 'Kết nối': 'HyperSpeed', 'Pin': '90 giờ', 'Switch': 'Optical Gen-3' },
    stock: 16, warranty: '24 tháng', rating: 4.8, reviews: 156
  },
  {
    id: 'mouse-003',
    code: 'MOU003',
    name: 'Pulsar X2V2',
    category: 'mouse',
    subcategory: 'Chuột',
    price: 2790000,
    originalPrice: 2990000,
    image: '/images/products/mouse-pulsar.jpg',
    description: 'Chuột gaming siêu nhẹ 52g, symmetrical. Sensor PAW3395, switch Omron optical, hỗ trợ 4K polling.',
    specs: { 'Cân nặng': '52g', 'Sensor': 'PAW3395', 'Polling rate': '4000Hz', 'Kết nối': 'Wireless / USB-C', 'Pin': '70 giờ', 'Switch': 'Omron Optical' },
    stock: 14, warranty: '12 tháng', rating: 4.6, reviews: 67
  },
  // Headset
  {
    id: 'hs-001',
    code: 'HS001',
    name: 'HyperX Cloud III',
    category: 'headset',
    subcategory: 'Tai nghe',
    price: 2290000,
    originalPrice: 2490000,
    image: '/images/products/headset-hyperx.jpg',
    description: 'Tai nghe gaming huyền thoại thế hệ mới. Driver 53mm, micro chống ồn, đệm memory foam cao cấp.',
    specs: { 'Driver': '53mm', 'Tần số': '10Hz-21kHz', 'Trở kháng': '64 Ohm', 'Micro': 'Chống ồn', 'Kết nối': '3.5mm / USB', 'Trọng lượng': '298g' },
    stock: 25, warranty: '24 tháng', rating: 4.6, reviews: 145
  },
  {
    id: 'hs-002',
    code: 'HS002',
    name: 'Logitech G733 Lightspeed',
    category: 'headset',
    subcategory: 'Tai nghe',
    price: 2990000,
    originalPrice: 3290000,
    image: '/images/products/headset-logitech.jpg',
    description: 'Tai nghe gaming không dây RGB với âm thanh surround 7.1. Thiết kế headband độc đáo, pin 29 giờ.',
    specs: { 'Driver': 'PRO-G 40mm', 'Tần số': '20Hz-20kHz', 'Kết nối': 'LIGHTSPEED', 'RGB': 'LIGHTSYNC', 'Pin': '29 giờ', 'Khoảng cách': '20m' },
    stock: 18, warranty: '24 tháng', rating: 4.5, reviews: 98
  },
  {
    id: 'hs-003',
    code: 'HS003',
    name: 'SteelSeries Arctis Nova 7',
    category: 'headset',
    subcategory: 'Tai nghe',
    price: 4290000,
    originalPrice: 4690000,
    image: '/images/products/headset-steelseries.jpg',
    description: 'Tai nghe gaming cao cấp, âm thanh 360° Spatial Audio. Kết nối đa năng 2.4GHz + Bluetooth, pin 38 giờ.',
    specs: { 'Driver': 'Custom 40mm', 'Tần số': '20Hz-22kHz', 'Kết nối': '2.4GHz / Bluetooth', 'Micro': 'ClearCast AI', 'Pin': '38 giờ', 'Trọng lượng': '323g' },
    stock: 10, warranty: '24 tháng', rating: 4.7, reviews: 56
  },
  // PSU
  {
    id: 'psu-001',
    code: 'PSU001',
    name: 'Corsair RM850x 850W 80 Plus Gold',
    category: 'psu',
    subcategory: 'Nguồn',
    price: 3490000,
    originalPrice: 3790000,
    image: '/images/products/psu-corsair.jpg',
    description: 'Nguồn máy tính 850W 80 Plus Gold, fully modular. Quạt 135mm magnetic levitation, bảo hành 10 năm.',
    specs: { 'Công suất': '850W', 'Hiệu suất': '80 Plus Gold', 'Modular': 'Full', 'Quạt': '135mm Mag-Lev', 'Bảo vệ': 'OCP/OVP/UVP/OPP/OTP/SCP', 'Bảo hành': '10 năm' },
    stock: 20, warranty: '120 tháng', rating: 4.8, reviews: 112
  },
  {
    id: 'psu-002',
    code: 'PSU002',
    name: 'ASUS ROG Thor 1000W Platinum II',
    category: 'psu',
    subcategory: 'Nguồn',
    price: 7990000,
    originalPrice: 8490000,
    image: '/images/products/psu-asus.jpg',
    description: 'Nguồn cao cấp 1000W 80 Plus Platinum, OLED display, RGB Aura Sync. Lambda A++ certified, siêu êm.',
    specs: { 'Công suất': '1000W', 'Hiệu suất': '80 Plus Platinum', 'Modular': 'Full', 'OLED': 'Hiển thị công suất thờ gian thực', 'RGB': 'Aura Sync', 'Bảo hành': '10 năm' },
    stock: 8, warranty: '120 tháng', rating: 4.9, reviews: 45
  },
  // Case
  {
    id: 'case-001',
    code: 'CASE001',
    name: 'NZXT H7 Flow',
    category: 'case',
    subcategory: 'Case',
    price: 3290000,
    originalPrice: 3590000,
    image: '/images/products/case-nzxt.jpg',
    description: 'Case mid-tower với thiết kế lưới front panel tối ưu airflow. Hỗ trợ radiator 360mm, cable management xuất sắc.',
    specs: { 'Form factor': 'Mid Tower', 'Mainboard': 'E-ATX / ATX / mATX', 'VGA max': '400mm', 'Radiator': '360mm front / 360mm top', 'Fan': '3x 120mm included', 'Material': 'Steel / TG' },
    stock: 12, warranty: '24 tháng', rating: 4.7, reviews: 78
  },
  {
    id: 'case-002',
    code: 'CASE002',
    name: 'Lian Li O11 Dynamic EVO',
    category: 'case',
    subcategory: 'Case',
    price: 4990000,
    originalPrice: 5490000,
    image: '/images/products/case-lianli.jpg',
    description: 'Case dual-chamber huyền thoại, thiết kế module có thể đảo ngược. Hỗ trợ đầy đủ watercooling custom.',
    specs: { 'Form factor': 'Mid Tower', 'Mainboard': 'E-ATX / ATX', 'VGA max': '420mm', 'Radiator': '420mm top / 360mm side', 'Fan': 'Không kèm', 'Material': 'Aluminum / TG' },
    stock: 6, warranty: '24 tháng', rating: 4.9, reviews: 89
  },
  // Cooler
  {
    id: 'cool-001',
    code: 'COOL001',
    name: 'NZXT Kraken 360 RGB',
    category: 'cooler',
    subcategory: 'Tản nhiệt',
    price: 6490000,
    originalPrice: 6990000,
    image: '/images/products/cooler-nzxt.jpg',
    description: 'Tản nhiệt nước AIO 360mm với màn hình LCD 1.54" trên pump head. 3 fan RGB F120, hiệu năng tuyệt vờ.',
    specs: { 'Loại': 'AIO Liquid 360mm', 'Pump': 'Asetek 7th gen', 'Màn hình': 'LCD 1.54"', 'Fan': '3x F120 RGB', 'TDP': '280W+', 'Bảo hành': '6 năm' },
    stock: 10, warranty: '72 tháng', rating: 4.8, reviews: 67
  },
  {
    id: 'cool-002',
    code: 'COOL002',
    name: 'Noctua NH-D15 chromax.black',
    category: 'cooler',
    subcategory: 'Tản nhiệt',
    price: 3290000,
    originalPrice: 3590000,
    image: '/images/products/cooler-noctua.jpg',
    description: 'Tản nhiệm khí dual-tower huyền thoại màu đen. 2 fan NF-A15 140mm, hiệu năng tản nhiệt vượt trội, cực êm.',
    specs: { 'Loại': 'Air Dual Tower', 'Fan': '2x NF-A15 140mm', 'Chiều cao': '165mm', 'TDP': '250W+', 'Socket': 'Intel/AMD universal', 'Màu': 'chromax.black' },
    stock: 14, warranty: '72 tháng', rating: 4.9, reviews: 134
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge === 'Hot' || p.badge === 'Bán chạy');
}

export function getFlashSaleProducts(): Product[] {
  return products.filter(p => p.originalPrice > p.price).slice(0, 8);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.code.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}
