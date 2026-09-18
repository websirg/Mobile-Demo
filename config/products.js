// Initial Seed Data: Smartphones
const INITIAL_PRODUCTS = [
  {
    "id": "wm-phone-01",
    "name": "Apple iPhone 16",
    "brand": "Apple",
    "model": "iPhone 16",
    "ram": "8GB",
    "storage": "128GB",
    "color": "Teal",
    "price": 79900,
    "offerPrice": 74900,
    "discount": "6% OFF",
    "rating": 4.9,
    "reviewsCount": 142,
    "stock": 3,
    "warranty": "1 Year Official Apple India Warranty",
    "featured": true,
    "isDeal": true,
    "dealBadge": "Deal of the Day",
    "colors": [
      "Teal",
      "Black",
      "Pink",
      "Ultramarine",
      "White"
    ],
    "storageOptions": [
      "128GB",
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "8GB"
    ],
    "specs": {
      "display": "6.1\" Super Retina XDR OLED, 2000 nits peak brightness",
      "processor": "A18 Bionic Chip (3nm) with Apple Intelligence",
      "rearCamera": "48MP Fusion + 12MP Ultra-wide with Macro",
      "frontCamera": "12MP TrueDepth Camera with Autofocus",
      "battery": "3561 mAh, 50% in 30 mins (25W MagSafe)",
      "os": "iOS 18 (Upgradable)",
      "network": "5G Dual SIM (nano-SIM + eSIM)"
    },
    "imeis": [
      {
        "imei1": "867452061111111",
        "imei2": "867452061111112",
        "serial": "SN-IP16-01",
        "color": "Teal",
        "storage": "128GB",
        "purchasePrice": 69000,
        "sellingPrice": 74900,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-01"
      },
      {
        "imei1": "867452061111113",
        "imei2": "867452061111114",
        "serial": "SN-IP16-02",
        "color": "Black",
        "storage": "128GB",
        "purchasePrice": 69000,
        "sellingPrice": 74900,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-02"
      },
      {
        "imei1": "867452061111115",
        "imei2": "867452061111116",
        "serial": "SN-IP16-03",
        "color": "Pink",
        "storage": "128GB",
        "purchasePrice": 69000,
        "sellingPrice": 74900,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-02"
      },
      {
        "imei1": "867452061111117",
        "imei2": "867452061111118",
        "serial": "SN-IP16-04",
        "color": "Teal",
        "storage": "128GB",
        "purchasePrice": 69000,
        "sellingPrice": 74900,
        "status": "Sold",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-02-20",
        "soldDate": "2026-03-10",
        "invoiceNo": "WM-INV-2026-0001"
      }
    ],
    "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-02",
    "name": "Apple iPhone 16 Pro",
    "brand": "Apple",
    "model": "iPhone 16 Pro",
    "ram": "8GB",
    "storage": "256GB",
    "color": "Desert Titanium",
    "price": 129900,
    "offerPrice": 124900,
    "discount": "4% OFF",
    "rating": 5.0,
    "reviewsCount": 98,
    "stock": 2,
    "warranty": "1 Year Official Apple India Warranty",
    "featured": true,
    "isDeal": false,
    "colors": [
      "Desert Titanium",
      "Natural Titanium",
      "White Titanium",
      "Black Titanium"
    ],
    "storageOptions": [
      "128GB",
      "256GB",
      "512GB",
      "1TB"
    ],
    "ramOptions": [
      "8GB"
    ],
    "specs": {
      "display": "6.3\" ProMotion 120Hz Super Retina XDR OLED, Always-On",
      "processor": "A18 Pro Chip (3nm) with 6-core GPU & Hardware Ray Tracing",
      "rearCamera": "48MP Fusion + 48MP Ultra-wide + 12MP 5x Telephoto",
      "frontCamera": "12MP TrueDepth Camera with Photonic Engine",
      "battery": "3582 mAh, 27W Fast Charging",
      "os": "iOS 18 Pro",
      "network": "5G Ultra Wideband, Dual SIM (eSIM support)"
    },
    "imeis": [
      {
        "imei1": "867452062222221",
        "imei2": "867452062222222",
        "serial": "SN-IP16P-01",
        "color": "Desert Titanium",
        "storage": "256GB",
        "purchasePrice": 115000,
        "sellingPrice": 124900,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-05"
      },
      {
        "imei1": "867452062222223",
        "imei2": "867452062222224",
        "serial": "SN-IP16P-02",
        "color": "Natural Titanium",
        "storage": "256GB",
        "purchasePrice": 115000,
        "sellingPrice": 124900,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-05"
      }
    ],
    "image": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-03",
    "name": "Samsung Galaxy S25 5G",
    "brand": "Samsung",
    "model": "Galaxy S25",
    "ram": "12GB",
    "storage": "256GB",
    "color": "Navy Blue",
    "price": 84999,
    "offerPrice": 79999,
    "discount": "6% OFF",
    "rating": 4.8,
    "reviewsCount": 85,
    "stock": 4,
    "warranty": "1 Year Brand Warranty + 1 Year Extended Store Care",
    "featured": true,
    "isDeal": true,
    "dealBadge": "Galaxy AI Powered",
    "colors": [
      "Navy Blue",
      "Silver Shadow",
      "Mint Green",
      "Sparkling Black"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "12GB"
    ],
    "specs": {
      "display": "6.2\" Dynamic AMOLED 2X, 120Hz LTPO, 2600 nits",
      "processor": "Snapdragon 8 Elite for Galaxy (3nm)",
      "rearCamera": "50MP Dual Pixel OIS + 12MP Ultra-wide + 10MP 3x Telephoto",
      "frontCamera": "12MP HDR Front Camera",
      "battery": "4000 mAh with 25W Fast Charging",
      "os": "Android 15 with One UI 7 (7 Years OS Updates)",
      "network": "5G Dual SIM (nano-SIM + eSIM)"
    },
    "imeis": [
      {
        "imei1": "867452063333331",
        "imei2": "867452063333332",
        "serial": "SN-S25-01",
        "color": "Navy Blue",
        "storage": "256GB",
        "purchasePrice": 71000,
        "sellingPrice": 79999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-02"
      },
      {
        "imei1": "867452063333333",
        "imei2": "867452063333334",
        "serial": "SN-S25-02",
        "color": "Silver Shadow",
        "storage": "256GB",
        "purchasePrice": 71000,
        "sellingPrice": 79999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-02"
      },
      {
        "imei1": "867452063333335",
        "imei2": "867452063333336",
        "serial": "SN-S25-03",
        "color": "Mint Green",
        "storage": "256GB",
        "purchasePrice": 71000,
        "sellingPrice": 79999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-02"
      }
    ],
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-04",
    "name": "Samsung Galaxy S25 Ultra",
    "brand": "Samsung",
    "model": "Galaxy S25 Ultra",
    "ram": "12GB",
    "storage": "512GB",
    "color": "Titanium Gray",
    "price": 139999,
    "offerPrice": 129999,
    "discount": "7% OFF",
    "rating": 5.0,
    "reviewsCount": 112,
    "stock": 3,
    "warranty": "1 Year Samsung India Warranty",
    "featured": true,
    "isDeal": false,
    "colors": [
      "Titanium Gray",
      "Titanium Black",
      "Titanium Violet",
      "Titanium Yellow"
    ],
    "storageOptions": [
      "256GB",
      "512GB",
      "1TB"
    ],
    "ramOptions": [
      "12GB",
      "16GB"
    ],
    "specs": {
      "display": "6.8\" Dynamic LTPO AMOLED 2X, Gorilla Armor Anti-Reflective",
      "processor": "Snapdragon 8 Elite (3nm) with built-in S-Pen",
      "rearCamera": "200MP Main OIS + 50MP 5x Periscope + 50MP Ultra-wide + 10MP 3x",
      "frontCamera": "12MP Dual Pixel AF",
      "battery": "5000 mAh with 45W Fast Charging",
      "os": "Android 15, One UI 7",
      "network": "5G Dual SIM + Ultra Wideband"
    },
    "imeis": [
      {
        "imei1": "867452064444441",
        "imei2": "867452064444442",
        "serial": "SN-S25U-01",
        "color": "Titanium Gray",
        "storage": "512GB",
        "purchasePrice": 118000,
        "sellingPrice": 129999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-04"
      },
      {
        "imei1": "867452064444443",
        "imei2": "867452064444444",
        "serial": "SN-S25U-02",
        "color": "Titanium Black",
        "storage": "512GB",
        "purchasePrice": 118000,
        "sellingPrice": 129999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-04"
      }
    ],
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-05",
    "name": "Samsung Galaxy A56 5G",
    "brand": "Samsung",
    "model": "Galaxy A56 5G",
    "ram": "8GB",
    "storage": "256GB",
    "color": "Awesome Ice Blue",
    "price": 38999,
    "offerPrice": 34999,
    "discount": "10% OFF",
    "rating": 4.6,
    "reviewsCount": 67,
    "stock": 5,
    "warranty": "1 Year Samsung India Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "Best Seller in Mid-Range",
    "colors": [
      "Awesome Ice Blue",
      "Awesome Navy",
      "Awesome Lilac"
    ],
    "storageOptions": [
      "128GB",
      "256GB"
    ],
    "ramOptions": [
      "8GB"
    ],
    "specs": {
      "display": "6.6\" Super AMOLED, 120Hz, 1000 nits, Gorilla Glass Victus+",
      "processor": "Exynos 1580 (4nm) Octa-Core",
      "rearCamera": "50MP OIS + 12MP Ultra-wide + 5MP Macro",
      "frontCamera": "32MP Selfie Camera",
      "battery": "5000 mAh with 45W Fast Charging",
      "os": "Android 15, One UI 7",
      "network": "5G Dual SIM, IP67 Dust/Water Resistant"
    },
    "imeis": [
      {
        "imei1": "867452065555551",
        "imei2": "867452065555552",
        "serial": "SN-A56-01",
        "color": "Awesome Ice Blue",
        "storage": "256GB",
        "purchasePrice": 29500,
        "sellingPrice": 34999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-01"
      },
      {
        "imei1": "867452065555553",
        "imei2": "867452065555554",
        "serial": "SN-A56-02",
        "color": "Awesome Navy",
        "storage": "256GB",
        "purchasePrice": 29500,
        "sellingPrice": 34999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-01"
      }
    ],
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-06",
    "name": "OnePlus 13 5G",
    "brand": "OnePlus",
    "model": "OnePlus 13",
    "ram": "16GB",
    "storage": "512GB",
    "color": "Emerald Green",
    "price": 74999,
    "offerPrice": 69999,
    "discount": "7% OFF",
    "rating": 4.9,
    "reviewsCount": 89,
    "stock": 3,
    "warranty": "1 Year OnePlus Official Warranty",
    "featured": true,
    "isDeal": false,
    "colors": [
      "Emerald Green",
      "Midnight Black",
      "Arctic White"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "12GB",
      "16GB"
    ],
    "specs": {
      "display": "6.82\" 2K Oriental Screen, 120Hz 8T LTPO, 4500 nits",
      "processor": "Snapdragon 8 Elite (3nm)",
      "rearCamera": "50MP LYT-808 OIS + 50MP Periscope 3x + 50MP Ultra-wide (Hasselblad)",
      "frontCamera": "32MP 4K Front Camera",
      "battery": "6000 mAh Glacier Battery with 100W SUPERVOOC",
      "os": "OxygenOS 15 based on Android 15",
      "network": "5G Dual SIM, IP68/IP69 Rating"
    },
    "imeis": [
      {
        "imei1": "867452066666661",
        "imei2": "867452066666662",
        "serial": "SN-OP13-01",
        "color": "Emerald Green",
        "storage": "512GB",
        "purchasePrice": 62000,
        "sellingPrice": 69999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-03"
      },
      {
        "imei1": "867452066666663",
        "imei2": "867452066666664",
        "serial": "SN-OP13-02",
        "color": "Midnight Black",
        "storage": "512GB",
        "purchasePrice": 62000,
        "sellingPrice": 69999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-03"
      }
    ],
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-07",
    "name": "OnePlus Nord 4 5G",
    "brand": "OnePlus",
    "model": "Nord 4",
    "ram": "8GB",
    "storage": "256GB",
    "color": "Mercurial Silver",
    "price": 32999,
    "offerPrice": 29999,
    "discount": "9% OFF",
    "rating": 4.7,
    "reviewsCount": 134,
    "stock": 6,
    "warranty": "1 Year OnePlus Official Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "All-Metal Unibody",
    "colors": [
      "Mercurial Silver",
      "Oasis Green",
      "Obsidian Midnight"
    ],
    "storageOptions": [
      "128GB",
      "256GB"
    ],
    "ramOptions": [
      "8GB",
      "12GB"
    ],
    "specs": {
      "display": "6.74\" 1.5K AMOLED, 120Hz Ultra HDR, 2150 nits",
      "processor": "Snapdragon 7+ Gen 3 (4nm)",
      "rearCamera": "50MP Sony LYT-600 OIS + 8MP Ultra-wide",
      "frontCamera": "16MP EIS Selfie Camera",
      "battery": "5500 mAh with 100W SUPERVOOC",
      "os": "OxygenOS 14.1 (4 Years Android Upgrades)",
      "network": "5G Dual SIM, Alert Slider"
    },
    "imeis": [
      {
        "imei1": "867452067777771",
        "imei2": "867452067777772",
        "serial": "SN-NORD4-01",
        "color": "Mercurial Silver",
        "storage": "256GB",
        "purchasePrice": 26000,
        "sellingPrice": 29999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-02"
      },
      {
        "imei1": "867452067777773",
        "imei2": "867452067777774",
        "serial": "SN-NORD4-02",
        "color": "Oasis Green",
        "storage": "256GB",
        "purchasePrice": 26000,
        "sellingPrice": 29999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-02"
      }
    ],
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-08",
    "name": "Google Pixel 9",
    "brand": "Google",
    "model": "Pixel 9",
    "ram": "12GB",
    "storage": "256GB",
    "color": "Peony Pink",
    "price": 84999,
    "offerPrice": 79999,
    "discount": "6% OFF",
    "rating": 4.8,
    "reviewsCount": 73,
    "stock": 3,
    "warranty": "1 Year Google India Warranty",
    "featured": true,
    "isDeal": false,
    "colors": [
      "Peony Pink",
      "Obsidian Black",
      "Porcelain White",
      "Wintergreen"
    ],
    "storageOptions": [
      "128GB",
      "256GB"
    ],
    "ramOptions": [
      "12GB"
    ],
    "specs": {
      "display": "6.3\" Actua OLED, 120Hz, 2700 nits peak brightness",
      "processor": "Google Tensor G4 with Titan M2 security",
      "rearCamera": "50MP Octa PD OIS + 48MP Quad PD Ultra-wide with Macro",
      "frontCamera": "10.5MP Dual PD Selfie with AF",
      "battery": "4700 mAh with 27W Fast Charging & Wireless Qi",
      "os": "Android 15 with Gemini Advanced Built-in",
      "network": "5G Dual SIM (nano + eSIM), IP68"
    },
    "imeis": [
      {
        "imei1": "867452068888881",
        "imei2": "867452068888882",
        "serial": "SN-PIX9-01",
        "color": "Peony Pink",
        "storage": "256GB",
        "purchasePrice": 72000,
        "sellingPrice": 79999,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-05"
      }
    ],
    "image": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-09",
    "name": "Vivo V40 Pro 5G",
    "brand": "Vivo",
    "model": "V40 Pro",
    "ram": "12GB",
    "storage": "512GB",
    "color": "Ganges Blue",
    "price": 54999,
    "offerPrice": 49999,
    "discount": "9% OFF",
    "rating": 4.7,
    "reviewsCount": 62,
    "stock": 4,
    "warranty": "1 Year Vivo India Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "ZEISS Multifocal Portrait",
    "colors": [
      "Ganges Blue",
      "Titanium Grey"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "8GB",
      "12GB"
    ],
    "specs": {
      "display": "6.78\" 1.5K 3D Curved AMOLED, 120Hz, 4500 nits",
      "processor": "MediaTek Dimensity 9200+ (4nm)",
      "rearCamera": "50MP Sony IMX921 OIS + 50MP ZEISS Telephoto + 50MP Ultra-wide",
      "frontCamera": "50MP ZEISS Group Selfie AF",
      "battery": "5500 mAh BlueVolt Battery with 80W FlashCharge",
      "os": "Funtouch OS 14 based on Android 14",
      "network": "5G Dual SIM, IP68 & IP69 Dust/Water"
    },
    "imeis": [
      {
        "imei1": "867452069999991",
        "imei2": "867452069999992",
        "serial": "SN-V40P-01",
        "color": "Ganges Blue",
        "storage": "512GB",
        "purchasePrice": 44000,
        "sellingPrice": 49999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-01"
      }
    ],
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-10",
    "name": "OPPO Reno 12 Pro 5G",
    "brand": "OPPO",
    "model": "Reno 12 Pro",
    "ram": "12GB",
    "storage": "256GB",
    "color": "Sunset Gold",
    "price": 39999,
    "offerPrice": 36999,
    "discount": "8% OFF",
    "rating": 4.6,
    "reviewsCount": 54,
    "stock": 3,
    "warranty": "1 Year OPPO India Warranty",
    "featured": false,
    "isDeal": false,
    "colors": [
      "Sunset Gold",
      "Space Brown"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "12GB"
    ],
    "specs": {
      "display": "6.7\" Infinite View Quad-Curved AMOLED, 120Hz",
      "processor": "MediaTek Dimensity 7300-Energy (4nm)",
      "rearCamera": "50MP Sony LYT-600 OIS + 50MP Telephoto 2x + 8MP Ultra-wide",
      "frontCamera": "50MP AF Ultra-clear Selfie",
      "battery": "5000 mAh with 80W SUPERVOOC",
      "os": "ColorOS 14.1 with GenAI Eraser 2.0",
      "network": "5G Dual SIM, BeaconLink Bluetooth 5.4"
    },
    "imeis": [
      {
        "imei1": "867452071111111",
        "imei2": "867452071111112",
        "serial": "SN-R12P-01",
        "color": "Sunset Gold",
        "storage": "256GB",
        "purchasePrice": 32500,
        "sellingPrice": 36999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-02"
      }
    ],
    "image": "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-11",
    "name": "Realme GT 6 5G",
    "brand": "Realme",
    "model": "GT 6",
    "ram": "12GB",
    "storage": "256GB",
    "color": "Fluid Silver",
    "price": 44999,
    "offerPrice": 40999,
    "discount": "9% OFF",
    "rating": 4.8,
    "reviewsCount": 81,
    "stock": 4,
    "warranty": "1 Year Realme India Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "6000 Nits Ultra Bright",
    "colors": [
      "Fluid Silver",
      "Razor Green"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "8GB",
      "12GB",
      "16GB"
    ],
    "specs": {
      "display": "6.78\" 1.5K 8T LTPO AMOLED, 6000 nits peak, 120Hz",
      "processor": "Snapdragon 8s Gen 3 (4nm)",
      "rearCamera": "50MP Sony LYT-808 OIS + 50MP Telephoto 2x + 8MP Ultra-wide",
      "frontCamera": "32MP Sony IMX615",
      "battery": "5500 mAh with 120W Ultra Charge",
      "os": "realme UI 5.0 based on Android 14",
      "network": "5G Dual SIM, Next AI Smart Removal"
    },
    "imeis": [
      {
        "imei1": "867452072222221",
        "imei2": "867452072222222",
        "serial": "SN-GT6-01",
        "color": "Fluid Silver",
        "storage": "256GB",
        "purchasePrice": 36000,
        "sellingPrice": 40999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-03"
      }
    ],
    "image": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-12",
    "name": "Motorola Edge 50 Ultra",
    "brand": "Motorola",
    "model": "Edge 50 Ultra",
    "ram": "16GB",
    "storage": "512GB",
    "color": "Nordic Wood",
    "price": 64999,
    "offerPrice": 59999,
    "discount": "8% OFF",
    "rating": 4.7,
    "reviewsCount": 49,
    "stock": 2,
    "warranty": "1 Year Motorola India Warranty",
    "featured": false,
    "isDeal": false,
    "colors": [
      "Nordic Wood",
      "Peach Fuzz",
      "Forest Grey"
    ],
    "storageOptions": [
      "512GB"
    ],
    "ramOptions": [
      "16GB"
    ],
    "specs": {
      "display": "6.7\" Super HD (1220p) pOLED, 144Hz, Pantone Validated",
      "processor": "Snapdragon 8s Gen 3 (4nm)",
      "rearCamera": "50MP Main OIS + 64MP 3x Periscope Telephoto + 50MP Ultra-wide",
      "frontCamera": "50MP AF with 4K 60fps",
      "battery": "4500 mAh with 125W TurboPower + 50W Wireless",
      "os": "Hello UI based on Android 14",
      "network": "5G Dual SIM, IP68 Underwater Protection"
    },
    "imeis": [
      {
        "imei1": "867452073333331",
        "imei2": "867452073333332",
        "serial": "SN-M50U-01",
        "color": "Nordic Wood",
        "storage": "512GB",
        "purchasePrice": 53000,
        "sellingPrice": 59999,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-01"
      }
    ],
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-13",
    "name": "Nothing Phone (2a) Plus",
    "brand": "Nothing",
    "model": "Phone (2a) Plus",
    "ram": "12GB",
    "storage": "256GB",
    "color": "Metallic Grey",
    "price": 29999,
    "offerPrice": 27999,
    "discount": "7% OFF",
    "rating": 4.7,
    "reviewsCount": 94,
    "stock": 5,
    "warranty": "1 Year Official Nothing Warranty",
    "featured": true,
    "isDeal": true,
    "dealBadge": "Iconic Glyph Interface",
    "colors": [
      "Metallic Grey",
      "Black"
    ],
    "storageOptions": [
      "256GB"
    ],
    "ramOptions": [
      "8GB",
      "12GB"
    ],
    "specs": {
      "display": "6.7\" Flexible AMOLED, 120Hz adaptive, 1300 nits",
      "processor": "MediaTek Dimensity 7350 Pro 5G (4nm)",
      "rearCamera": "50MP Main OIS + 50MP Ultra-wide 114\u00b0 FOV",
      "frontCamera": "50MP 4K Front Camera",
      "battery": "5000 mAh with 50W Fast Charging",
      "os": "Nothing OS 2.6 based on Android 14",
      "network": "5G Dual SIM, Glyph LED Lighting"
    },
    "imeis": [
      {
        "imei1": "867452074444441",
        "imei2": "867452074444442",
        "serial": "SN-NP2A-01",
        "color": "Metallic Grey",
        "storage": "256GB",
        "purchasePrice": 24000,
        "sellingPrice": 27999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-04"
      },
      {
        "imei1": "867452074444443",
        "imei2": "867452074444444",
        "serial": "SN-NP2A-02",
        "color": "Black",
        "storage": "256GB",
        "purchasePrice": 24000,
        "sellingPrice": 27999,
        "status": "Available",
        "supplier": "Supreme Accessories Mumbai",
        "purchaseDate": "2026-03-04"
      }
    ],
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-14",
    "name": "iQOO 12 5G",
    "brand": "iQOO",
    "model": "iQOO 12",
    "ram": "16GB",
    "storage": "512GB",
    "color": "Legend White",
    "price": 59999,
    "offerPrice": 52999,
    "discount": "12% OFF",
    "rating": 4.9,
    "reviewsCount": 115,
    "stock": 3,
    "warranty": "1 Year iQOO Official India Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "Ultimate Gaming Flagship",
    "colors": [
      "Legend White (BMW M Motorsport)",
      "Alpha Black"
    ],
    "storageOptions": [
      "256GB",
      "512GB"
    ],
    "ramOptions": [
      "12GB",
      "16GB"
    ],
    "specs": {
      "display": "6.78\" 1.5K LTPO AMOLED, 144Hz, 3000 nits peak",
      "processor": "Snapdragon 8 Gen 3 with SuperComputing Q1 Chip",
      "rearCamera": "50MP 1/1.3\" Astro OIS + 64MP 3x Periscope (100x Digital) + 50MP Ultra-wide",
      "frontCamera": "16MP HD Camera",
      "battery": "5000 mAh with 120W FlashCharge",
      "os": "Funtouch OS 14 on Android 14",
      "network": "5G Dual SIM, IP64 Rating"
    },
    "imeis": [
      {
        "imei1": "867452075555551",
        "imei2": "867452075555552",
        "serial": "SN-IQ12-01",
        "color": "Legend White",
        "storage": "512GB",
        "purchasePrice": 46500,
        "sellingPrice": 52999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-02"
      }
    ],
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-15",
    "name": "Xiaomi 14 5G",
    "brand": "Xiaomi",
    "model": "Xiaomi 14",
    "ram": "12GB",
    "storage": "512GB",
    "color": "Jade Green",
    "price": 69999,
    "offerPrice": 59999,
    "discount": "14% OFF",
    "rating": 4.8,
    "reviewsCount": 78,
    "stock": 3,
    "warranty": "1 Year Xiaomi India Warranty",
    "featured": false,
    "isDeal": false,
    "colors": [
      "Jade Green",
      "Black",
      "White"
    ],
    "storageOptions": [
      "512GB"
    ],
    "ramOptions": [
      "12GB"
    ],
    "specs": {
      "display": "6.36\" 1.5K LTPO OLED, 120Hz, 3000 nits, Dolby Vision",
      "processor": "Snapdragon 8 Gen 3 (4nm)",
      "rearCamera": "50MP Leica Summilux OIS + 50MP Leica 75mm Floating Telephoto + 50MP Ultra-wide",
      "frontCamera": "32MP 4K 60fps Front Camera",
      "battery": "4610 mAh with 90W HyperCharge + 50W Wireless",
      "os": "Xiaomi HyperOS based on Android 14",
      "network": "5G Dual SIM, IP68 Waterproof"
    },
    "imeis": [
      {
        "imei1": "867452076666661",
        "imei2": "867452076666662",
        "serial": "SN-XI14-01",
        "color": "Jade Green",
        "storage": "512GB",
        "purchasePrice": 52000,
        "sellingPrice": 59999,
        "status": "Available",
        "supplier": "Apex Mobile Wholesale Delhi",
        "purchaseDate": "2026-03-01"
      }
    ],
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": "wm-phone-16",
    "name": "iQOO Neo 9 Pro 5G",
    "brand": "iQOO",
    "model": "Neo 9 Pro",
    "ram": "8GB",
    "storage": "256GB",
    "color": "Fiery Red",
    "price": 39999,
    "offerPrice": 35999,
    "discount": "10% OFF",
    "rating": 4.8,
    "reviewsCount": 91,
    "stock": 4,
    "warranty": "1 Year iQOO Official India Warranty",
    "featured": false,
    "isDeal": true,
    "dealBadge": "Dual Chip Power",
    "colors": [
      "Fiery Red",
      "Conqueror Black"
    ],
    "storageOptions": [
      "128GB",
      "256GB"
    ],
    "ramOptions": [
      "8GB",
      "12GB"
    ],
    "specs": {
      "display": "6.78\" 1.5K 144Hz LTPO AMOLED, 3000 nits",
      "processor": "Snapdragon 8 Gen 2 with SuperComputing Q1 Chip",
      "rearCamera": "50MP Sony IMX920 OIS + 8MP Ultra-wide",
      "frontCamera": "16MP Selfie Camera",
      "battery": "5160 mAh with 120W Dual-Cell FlashCharge",
      "os": "Funtouch OS 14 on Android 14",
      "network": "5G Dual SIM"
    },
    "imeis": [
      {
        "imei1": "867452077777771",
        "imei2": "867452077777772",
        "serial": "SN-NEO9-01",
        "color": "Fiery Red",
        "storage": "256GB",
        "purchasePrice": 31000,
        "sellingPrice": 35999,
        "status": "Available",
        "supplier": "TechVision Distro",
        "purchaseDate": "2026-03-03"
      }
    ],
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ]
  }
];
