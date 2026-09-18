// Initial Seed Data: Repairs
const INITIAL_REPAIRS = [
  {
    "jobId": "WM-REP-2026-0001",
    "customer": "Rahul Sharma",
    "phone": "+91 98112 34567",
    "device": "iPhone 14 Pro",
    "imei": "354892019482910",
    "problem": "Shattered OLED display and unresponsive touch",
    "deviceCondition": "Minor scuffs on frame, glass cracked",
    "accessoriesReceived": "Device only (No SIM/Cover)",
    "technician": "Rajesh Kumar (Senior Apple Specialist)",
    "estimatedCost": 7500,
    "advancePaid": 2000,
    "balanceAmount": 5500,
    "status": "Ready",
    "partsUsed": [
      {
        "name": "Original OLED Display Assembly",
        "cost": 6200
      }
    ],
    "labourCharge": 1300,
    "notes": "Display replaced with true-tone calibration intact. Passed quality inspection.",
    "dateCreated": "2026-03-12",
    "dateUpdated": "2026-03-14",
    "expectedDelivery": "2026-03-15"
  },
  {
    "jobId": "WM-REP-2026-0002",
    "customer": "Amitabh Sengupta",
    "phone": "+91 99345 67890",
    "device": "Samsung Galaxy S22 Ultra",
    "imei": "359124082910482",
    "problem": "Battery draining rapidly (swollen back panel)",
    "deviceCondition": "Back glass lifted slightly due to swollen battery",
    "accessoriesReceived": "Device with back cover",
    "technician": "Suresh Patel",
    "estimatedCost": 3200,
    "advancePaid": 1000,
    "balanceAmount": 2200,
    "status": "Repairing",
    "partsUsed": [
      {
        "name": "Samsung 5000mAh Original Cell Battery",
        "cost": 2400
      }
    ],
    "labourCharge": 800,
    "notes": "New battery fitted. Testing thermal cycle and fast charging rate.",
    "dateCreated": "2026-03-14",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-16"
  },
  {
    "jobId": "WM-REP-2026-0003",
    "customer": "Neha Malhotra",
    "phone": "+91 97456 78901",
    "device": "OnePlus 11 5G",
    "imei": "864201948201942",
    "problem": "Type-C charging port loose, only charges at specific angle",
    "deviceCondition": "Clean device",
    "accessoriesReceived": "Device only",
    "technician": "Anil Verma",
    "estimatedCost": 1800,
    "advancePaid": 500,
    "balanceAmount": 1300,
    "status": "Quality Check",
    "partsUsed": [
      {
        "name": "Original 100W Charging Port Sub-Board",
        "cost": 1200
      }
    ],
    "labourCharge": 600,
    "notes": "Replaced sub-board. SuperVOOC 100W verified working perfectly.",
    "dateCreated": "2026-03-13",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-15"
  },
  {
    "jobId": "WM-REP-2026-0004",
    "customer": "Mohit Chawla",
    "phone": "+91 94789 01234",
    "device": "Xiaomi 13 Pro",
    "imei": "869102482019482",
    "problem": "Rear camera lens cracked, photos blurry",
    "deviceCondition": "Dent on top-left corner",
    "accessoriesReceived": "Device with box",
    "technician": "Rajesh Kumar",
    "estimatedCost": 4500,
    "advancePaid": 1500,
    "balanceAmount": 3000,
    "status": "Waiting for Parts",
    "partsUsed": [
      {
        "name": "1-inch Sensor Sapphire Glass Ring & Lens",
        "cost": 3600
      }
    ],
    "labourCharge": 900,
    "notes": "Part dispatched from supplier, expected arrival by tomorrow morning.",
    "dateCreated": "2026-03-14",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-17"
  },
  {
    "jobId": "WM-REP-2026-0005",
    "customer": "Karan Kapoor",
    "phone": "+91 92901 23456",
    "device": "Vivo X90 Pro",
    "imei": "861029482019481",
    "problem": "Accidental pool drop, device not turning on",
    "deviceCondition": "Water indicator red in SIM tray",
    "accessoriesReceived": "Device only",
    "technician": "Suresh Patel",
    "estimatedCost": 5800,
    "advancePaid": 2000,
    "balanceAmount": 3800,
    "status": "Waiting for Approval",
    "partsUsed": [
      {
        "name": "Ultrasonic Motherboard Wash & PMIC Reball",
        "cost": 4500
      }
    ],
    "labourCharge": 1300,
    "notes": "Motherboard cleaned from corrosion. Sent quotation to customer for approval.",
    "dateCreated": "2026-03-15",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-18"
  },
  {
    "jobId": "WM-REP-2026-0006",
    "customer": "Vikram Rajput",
    "phone": "+91 96567 89012",
    "device": "iPhone 13",
    "imei": "351029481029384",
    "problem": "Earpiece speaker sound extremely low during phone calls",
    "deviceCondition": "Normal wear and tear",
    "accessoriesReceived": "Device with case",
    "technician": "Anil Verma",
    "estimatedCost": 1200,
    "advancePaid": 1200,
    "balanceAmount": 0,
    "status": "Delivered",
    "partsUsed": [
      {
        "name": "Original Dust Mesh & Ear Speaker",
        "cost": 700
      }
    ],
    "labourCharge": 500,
    "notes": "Replaced speaker and mesh. Audio decibels tested at 82dB.",
    "dateCreated": "2026-03-08",
    "dateUpdated": "2026-03-10",
    "expectedDelivery": "2026-03-10"
  },
  {
    "jobId": "WM-REP-2026-0007",
    "customer": "Sunil Bansal",
    "phone": "+91 98100 11223",
    "device": "Realme GT 2 Pro",
    "imei": "862019482019482",
    "problem": "Stuck in bootloop after system update",
    "deviceCondition": "Clean condition",
    "accessoriesReceived": "Device only",
    "technician": "Suresh Patel",
    "estimatedCost": 900,
    "advancePaid": 500,
    "balanceAmount": 400,
    "status": "Diagnosis",
    "partsUsed": [],
    "labourCharge": 900,
    "notes": "Flashing firmware with authorized tool in progress.",
    "dateCreated": "2026-03-15",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-16"
  },
  {
    "jobId": "WM-REP-2026-0008",
    "customer": "Geeta Mehra",
    "phone": "+91 98200 22334",
    "device": "Samsung Galaxy M34 5G",
    "imei": "358291048291048",
    "problem": "Display black screen but vibrates on incoming calls",
    "deviceCondition": "Deep crack on glass",
    "accessoriesReceived": "Device only",
    "technician": "Anil Verma",
    "estimatedCost": 2800,
    "advancePaid": 1000,
    "balanceAmount": 1800,
    "status": "Received",
    "partsUsed": [],
    "labourCharge": 600,
    "notes": "Device booked in store. Slated for disassembly.",
    "dateCreated": "2026-03-15",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-17"
  },
  {
    "jobId": "WM-REP-2026-0009",
    "customer": "Harpreet Singh",
    "phone": "+91 98300 33445",
    "device": "Google Pixel 7a",
    "imei": "351948291048291",
    "problem": "Back glass completely shattered",
    "deviceCondition": "Frame fine, rear panel damaged",
    "accessoriesReceived": "Device with case",
    "technician": "Rajesh Kumar",
    "estimatedCost": 2200,
    "advancePaid": 1000,
    "balanceAmount": 1200,
    "status": "Ready",
    "partsUsed": [
      {
        "name": "Original Pixel 7a Sea Color Rear Panel",
        "cost": 1600
      }
    ],
    "labourCharge": 600,
    "notes": "Rear glass laser-glued with OEM adhesive.",
    "dateCreated": "2026-03-13",
    "dateUpdated": "2026-03-15",
    "expectedDelivery": "2026-03-15"
  },
  {
    "jobId": "WM-REP-2026-0010",
    "customer": "Pooja Verma",
    "phone": "+91 98234 56789",
    "device": "Apple Watch Series 8",
    "imei": "359012481029481",
    "problem": "Digital crown stuck, won't scroll",
    "deviceCondition": "Clean watch",
    "accessoriesReceived": "Watch unit with sport loop",
    "technician": "Rajesh Kumar",
    "estimatedCost": 1500,
    "advancePaid": 1500,
    "balanceAmount": 0,
    "status": "Delivered",
    "partsUsed": [
      {
        "name": "Crown Haptic Encoder Cleaning & Gasket",
        "cost": 800
      }
    ],
    "labourCharge": 700,
    "notes": "Debris cleared, water-resistance seals renewed.",
    "dateCreated": "2026-03-05",
    "dateUpdated": "2026-03-07",
    "expectedDelivery": "2026-03-07"
  }
];
