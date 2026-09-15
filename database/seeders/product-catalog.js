const appleImage = (asset) =>
  `https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/${asset}?wid=900&hei=900&fmt=png-alpha&qlt=90`;

const iphoneImages = [
  appleImage("iphone-17-pro-finish-select-202509-6-9inch-cosmicorange"),
  appleImage("iphone-17-pro-finish-select-202509-6-3inch-silver"),
  appleImage("iphone-air-finish-select-202509-skyblue"),
  appleImage("iphone-17-finish-select-202509-lavender"),
  appleImage("iphone-16-pro-finish-select-202409-6-9inch-deserttitanium"),
  appleImage("iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium"),
  appleImage("iphone-16-finish-select-202409-6-7inch-ultramarine"),
  appleImage("iphone-16-finish-select-202409-6-1inch-pink"),
  appleImage("iphone-15-finish-select-202309-6-7inch-green"),
  appleImage("iphone-15-finish-select-202309-6-1inch-black"),
];

const macbookImages = [
  appleImage("mba13-skyblue-select-202503"),
  appleImage("mba15-starlight-select-202503"),
  appleImage("mbp14-spaceblack-select-202410"),
  appleImage("mbp16-silver-select-202410"),
  appleImage("mbp14-spaceblack-select-202410"),
  appleImage("mbp16-silver-select-202410"),
  appleImage("mba13-midnight-select-202402"),
  appleImage("mba15-starlight-select-202306"),
  appleImage("mbp14-silver-select-202410"),
  appleImage("macbook-air-spacegray-select-20220606"),
];

const accessoryImages = [
  appleImage("airpods-4-select-202409"),
  appleImage("airpods-pro-3-hero-select-202509"),
  appleImage("airpods-max-select-202409-purple"),
  appleImage("MXLG3ref_VW_34FR+watch-case-42-aluminum-jetblack-nc-s11_VW_34FR+watch-face-42-aluminum-jetblack-s11_VW_34FR"),
  appleImage("MXM83ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s11_VW_34FR+watch-face-46-aluminum-jetblack-s11_VW_34FR"),
  appleImage("watch-compare-ultra3-202509_GEO_VN"),
  appleImage("MYJ33ref_VW_34FR+watch-case-40-aluminum-starlight-nc-se3_VW_34FR+watch-face-40-aluminum-starlight-se3_VW_34FR"),
  appleImage("MXMF3_FV98_VW_34FR+watch-case-44-aluminum-starlight-nc-se3_VW_34FR+watch-face-44-aluminum-starlight-se3_VW_34FR"),
  appleImage("MGD74"),
  appleImage("MGDM4"),
  appleImage("MD3J4"),
  appleImage("MNWP3_GEO_VN"),
  appleImage("MT0H3"),
  appleImage("MU2G3"),
  appleImage("MUQ93"),
  appleImage("MXK53"),
  appleImage("MXCL3"),
  appleImage("MXCK3"),
  appleImage("MXK93"),
  appleImage("MHW64"),
  appleImage("MGYW4"),
  appleImage("MGPG4"),
  appleImage("MHWC4"),
  appleImage("MGC24ref"),
  appleImage("MGJ24ref"),
  appleImage("MG9T4ref"),
  appleImage("airtag-1pack-select-202601"),
  appleImage("airtag-4pack-select-202601"),
  appleImage("MX2D3"),
  appleImage("apple-tv-4k-hero-select-202210"),
];

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const iphoneModels = [
  ["iPhone 17 Pro Max", 34990000, "A19 Pro", "6.9 inch", "Cam vũ trụ"],
  ["iPhone 17 Pro", 30990000, "A19 Pro", "6.3 inch", "Bạc"],
  ["iPhone Air", 27990000, "A19 Pro", "6.5 inch", "Xanh da trời"],
  ["iPhone 17", 24990000, "A19", "6.3 inch", "Tím oải hương"],
  ["iPhone 16 Pro Max", 29990000, "A18 Pro", "6.9 inch", "Titan sa mạc"],
  ["iPhone 16 Pro", 25990000, "A18 Pro", "6.3 inch", "Titan tự nhiên"],
  ["iPhone 16 Plus", 21990000, "A18", "6.7 inch", "Xanh lưu ly"],
  ["iPhone 16", 18990000, "A18", "6.1 inch", "Hồng"],
  ["iPhone 15 Plus", 18990000, "A16 Bionic", "6.7 inch", "Xanh lá"],
  ["iPhone 15", 15990000, "A16 Bionic", "6.1 inch", "Đen"],
];

const iphoneStorage = [
  ["128GB", 0],
  ["256GB", 3500000],
  ["512GB", 8500000],
];

const macbookModels = [
  ["MacBook Air 13 M4", 24990000, "Apple M4", "16GB", "13.6 inch", "Xanh da trời"],
  ["MacBook Air 15 M4", 29990000, "Apple M4", "16GB", "15.3 inch", "Ánh sao"],
  ["MacBook Pro 14 M5", 39990000, "Apple M5", "16GB", "14.2 inch", "Đen không gian"],
  ["MacBook Pro 16 M5 Pro", 64990000, "Apple M5 Pro", "24GB", "16.2 inch", "Bạc"],
  ["MacBook Pro 14 M4 Pro", 49990000, "Apple M4 Pro", "24GB", "14.2 inch", "Đen không gian"],
  ["MacBook Pro 16 M4 Max", 89990000, "Apple M4 Max", "36GB", "16.2 inch", "Bạc"],
  ["MacBook Air 13 M3", 21990000, "Apple M3", "16GB", "13.6 inch", "Midnight"],
  ["MacBook Air 15 M3", 26990000, "Apple M3", "16GB", "15.3 inch", "Ánh sao"],
  ["MacBook Pro 14 M4", 36990000, "Apple M4", "16GB", "14.2 inch", "Bạc"],
  ["MacBook Air 13 M2", 18990000, "Apple M2", "16GB", "13.6 inch", "Xám không gian"],
];

const macbookStorage = [
  ["256GB", 0],
  ["512GB", 4500000],
  ["1TB", 9500000],
];

const accessoryItems = [
  ["AirPods 4", 3490000, "Tai nghe", "Chống ồn chủ động"],
  ["AirPods Pro 3", 6490000, "Tai nghe", "Âm thanh thích ứng"],
  ["AirPods Max USB-C", 13990000, "Tai nghe", "Chụp tai cao cấp"],
  ["Apple Watch Series 11 GPS 42mm", 10990000, "Đồng hồ", "Nhôm, dây Sport"],
  ["Apple Watch Series 11 GPS 46mm", 11990000, "Đồng hồ", "Nhôm, dây Sport"],
  ["Apple Watch Ultra 3", 23990000, "Đồng hồ", "Titan, GPS + Cellular"],
  ["Apple Watch SE 3 40mm", 6490000, "Đồng hồ", "GPS, dây Sport"],
  ["Apple Watch SE 3 44mm", 7490000, "Đồng hồ", "GPS, dây Sport"],
  ["MagSafe Charger 1m", 1190000, "Sạc", "Sạc không dây từ tính"],
  ["MagSafe Charger 2m", 1490000, "Sạc", "Cáp dài 2 mét"],
  ["Củ sạc USB-C 20W", 590000, "Sạc", "Power Delivery"],
  ["Củ sạc USB-C 35W Dual", 1690000, "Sạc", "Hai cổng USB-C"],
  ["Cáp USB-C 60W 1m", 490000, "Cáp", "Cáp bện"],
  ["Cáp USB-C 240W 2m", 990000, "Cáp", "Sạc công suất cao"],
  ["Cáp USB-C to Lightning 1m", 590000, "Cáp", "Chuẩn MFi"],
  ["Magic Mouse USB-C", 2490000, "Phụ kiện Mac", "Multi-Touch"],
  ["Magic Keyboard USB-C", 3290000, "Phụ kiện Mac", "Bàn phím không dây"],
  ["Magic Keyboard Touch ID", 4490000, "Phụ kiện Mac", "Touch ID, USB-C"],
  ["Magic Trackpad USB-C", 3490000, "Phụ kiện Mac", "Force Touch"],
  ["Ốp iPhone 17 Pro Max Clear Case", 1290000, "Ốp lưng", "Tương thích MagSafe"],
  ["Ốp iPhone 17 Pro Silicone Case", 1390000, "Ốp lưng", "Silicone mềm"],
  ["Ốp iPhone Air Bumper", 1190000, "Ốp lưng", "Nhẹ và mỏng"],
  ["Ví FineWoven MagSafe", 1490000, "Ví", "Hỗ trợ Find My"],
  ["Dây Apple Watch Sport Band", 1190000, "Dây đeo", "Cao su fluoroelastomer"],
  ["Dây Apple Watch Milanese Loop", 2690000, "Dây đeo", "Thép không gỉ"],
  ["Dây Apple Watch Trail Loop", 2690000, "Dây đeo", "Siêu nhẹ"],
  ["AirTag 1 Pack", 790000, "Định vị", "Tìm đồ với Find My"],
  ["AirTag 4 Pack", 2690000, "Định vị", "Bộ bốn AirTag"],
  ["Apple Pencil Pro", 3490000, "Bút cảm ứng", "Bóp, xoay thân bút"],
  ["Apple TV 4K Wi-Fi 128GB", 3990000, "Giải trí", "Ethernet, Thread"],
];

const iphones = iphoneModels.flatMap((model, modelIndex) =>
  iphoneStorage.map(([storage, extra], storageIndex) => {
    const [baseName, basePrice, chip, display, color] = model;
    const name = `${baseName} ${storage}`;
    const price = basePrice + extra;
    return {
      sku: `IP-${String(modelIndex + 1).padStart(2, "0")}-${storageIndex + 1}`,
      slug: slugify(name),
      name,
      shortDescription: `${display}, chip ${chip}, màu ${color}`,
      categorySlug: "iphone",
      price,
      compareAtPrice: price + 2500000,
      stock: 8 + ((modelIndex * 3 + storageIndex) % 17),
      featured: modelIndex < 4 && storageIndex === 1 ? 1 : 0,
      color,
      specs: { chip, display, storage, color, warranty: "12 tháng" },
      imageUrl: iphoneImages[modelIndex],
    };
  }),
);

const macbooks = macbookModels.flatMap((model, modelIndex) =>
  macbookStorage.map(([storage, extra], storageIndex) => {
    const [baseName, basePrice, chip, memory, display, color] = model;
    const name = `${baseName} ${memory}/${storage}`;
    const price = basePrice + extra;
    return {
      sku: `MB-${String(modelIndex + 1).padStart(2, "0")}-${storageIndex + 1}`,
      slug: slugify(name),
      name,
      shortDescription: `${display}, ${chip}, RAM ${memory}, màu ${color}`,
      categorySlug: "macbook",
      price,
      compareAtPrice: price + 3500000,
      stock: 5 + ((modelIndex * 3 + storageIndex) % 12),
      featured: modelIndex < 4 && storageIndex === 1 ? 1 : 0,
      color,
      specs: { chip, display, memory, storage, color, warranty: "12 tháng" },
      imageUrl: macbookImages[modelIndex],
    };
  }),
);

const accessories = accessoryItems.map((item, index) => {
  const [name, price, type, detail] = item;
  return {
    sku: `PK-${String(index + 1).padStart(2, "0")}`,
    slug: slugify(name),
    name,
    shortDescription: `${type} Apple chính hãng · ${detail}`,
    categorySlug: "phu-kien",
    price,
    compareAtPrice: price + Math.max(200000, Math.round(price * 0.12 / 10000) * 10000),
    stock: 12 + ((index * 7) % 28),
    featured: index < 6 ? 1 : 0,
    color: index % 3 === 0 ? "Trắng" : index % 3 === 1 ? "Đen" : "Tự nhiên",
    specs: { type, detail, compatibility: "Hệ sinh thái Apple", warranty: "12 tháng" },
    imageUrl: accessoryImages[index],
  };
});

export const catalog = [...iphones, ...macbooks, ...accessories];

if (catalog.length !== 90) {
  throw new Error(`Catalog phải có đúng 90 sản phẩm, hiện có ${catalog.length}`);
}

if (iphoneImages.length !== 10 || macbookImages.length !== 10 || accessoryImages.length !== 30) {
  throw new Error("Bản đồ ảnh sản phẩm chưa đầy đủ.");
}
