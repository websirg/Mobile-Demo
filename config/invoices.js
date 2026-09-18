// Initial Seed Data: Invoices
const INITIAL_INVOICES = [
  {
    "invoiceNo": "WM-INV-2026-0001",
    "date": "2026-03-10",
    "customerName": "Rahul Sharma",
    "customerMobile": "+91 98112 34567",
    "customerAddress": "B-42, Lajpat Nagar II, New Delhi",
    "items": [
      {
        "name": "Apple iPhone 16 (128GB - Teal)",
        "imei": "867452061111117",
        "qty": 1,
        "price": 74900,
        "discount": 0,
        "taxable": 63474.58,
        "taxRate": 18,
        "total": 74900
      }
    ],
    "subtotal": 74900,
    "discount": 0,
    "taxableAmount": 63474.58,
    "cgst": 5712.71,
    "sgst": 5712.71,
    "grandTotal": 74900,
    "paymentMethod": "UPI (Google Pay)",
    "amountPaid": 74900,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0002",
    "date": "2026-03-11",
    "customerName": "Pooja Verma",
    "customerMobile": "+91 98234 56789",
    "customerAddress": "Flat 304, Green Park Extension, New Delhi",
    "items": [
      {
        "name": "Apple iPhone 16 Pro (256GB - Desert Titanium)",
        "imei": "867452062222225",
        "qty": 1,
        "price": 124900,
        "discount": 0,
        "taxable": 105847.46,
        "taxRate": 18,
        "total": 124900
      }
    ],
    "subtotal": 124900,
    "discount": 0,
    "taxableAmount": 105847.46,
    "cgst": 9526.27,
    "sgst": 9526.27,
    "grandTotal": 124900,
    "paymentMethod": "Credit Card (HDFC)",
    "amountPaid": 124900,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0003",
    "date": "2026-03-11",
    "customerName": "Amitabh Sengupta",
    "customerMobile": "+91 99345 67890",
    "customerAddress": "House 12, Sector 15, Noida, UP",
    "items": [
      {
        "name": "Samsung Galaxy S25 5G (256GB - Navy Blue)",
        "imei": "867452063333337",
        "qty": 1,
        "price": 79999,
        "discount": 1000,
        "taxable": 66948.31,
        "taxRate": 18,
        "total": 78999
      },
      {
        "name": "Spigen Liquid Air Case (S25)",
        "imei": "SKU-SPG-S25",
        "qty": 1,
        "price": 1000,
        "discount": 0,
        "taxable": 847.46,
        "taxRate": 18,
        "total": 1000
      }
    ],
    "subtotal": 80999,
    "discount": 1000,
    "taxableAmount": 67795.76,
    "cgst": 6101.62,
    "sgst": 6101.62,
    "grandTotal": 79999,
    "paymentMethod": "Partial (Cash + UPI)",
    "amountPaid": 74999,
    "balance": 5000,
    "status": "Partial"
  },
  {
    "invoiceNo": "WM-INV-2026-0004",
    "date": "2026-03-12",
    "customerName": "Neha Malhotra",
    "customerMobile": "+91 97456 78901",
    "customerAddress": "Pocket C, Mayur Vihar Phase 1, Delhi",
    "items": [
      {
        "name": "OnePlus Nord 4 5G (256GB - Mercurial Silver)",
        "imei": "867452067777775",
        "qty": 1,
        "price": 29999,
        "discount": 0,
        "taxable": 25422.88,
        "taxRate": 18,
        "total": 29999
      }
    ],
    "subtotal": 29999,
    "discount": 0,
    "taxableAmount": 25422.88,
    "cgst": 2288.06,
    "sgst": 2288.06,
    "grandTotal": 29999,
    "paymentMethod": "UPI (PhonePe)",
    "amountPaid": 29999,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0005",
    "date": "2026-03-12",
    "customerName": "Vikram Rajput",
    "customerMobile": "+91 96567 89012",
    "customerAddress": "Plot 88, DLF Phase 3, Gurugram, Haryana",
    "items": [
      {
        "name": "Samsung Galaxy S25 Ultra (512GB - Titanium Gray)",
        "imei": "867452064444445",
        "qty": 1,
        "price": 129999,
        "discount": 0,
        "taxable": 110168.64,
        "taxRate": 18,
        "total": 129999
      }
    ],
    "subtotal": 129999,
    "discount": 0,
    "taxableAmount": 110168.64,
    "cgst": 9915.18,
    "sgst": 9915.18,
    "grandTotal": 129999,
    "paymentMethod": "Card (Debit)",
    "amountPaid": 119999,
    "balance": 10000,
    "status": "Partial"
  },
  {
    "invoiceNo": "WM-INV-2026-0006",
    "date": "2026-03-13",
    "customerName": "Ananya Roy",
    "customerMobile": "+91 95678 90123",
    "customerAddress": "C-9, Vasant Kunj, New Delhi",
    "items": [
      {
        "name": "Samsung Galaxy A56 5G (256GB - Awesome Ice Blue)",
        "imei": "867452065555555",
        "qty": 1,
        "price": 34999,
        "discount": 0,
        "taxable": 29660.17,
        "taxRate": 18,
        "total": 34999
      }
    ],
    "subtotal": 34999,
    "discount": 0,
    "taxableAmount": 29660.17,
    "cgst": 2669.41,
    "sgst": 2669.41,
    "grandTotal": 34999,
    "paymentMethod": "Cash",
    "amountPaid": 34999,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0007",
    "date": "2026-03-13",
    "customerName": "Mohit Chawla",
    "customerMobile": "+91 94789 01234",
    "customerAddress": "14/2, Karol Bagh, Central Delhi",
    "items": [
      {
        "name": "OnePlus 13 5G (512GB - Emerald Green)",
        "imei": "867452066666665",
        "qty": 1,
        "price": 69999,
        "discount": 0,
        "taxable": 59321.19,
        "taxRate": 18,
        "total": 69999
      }
    ],
    "subtotal": 69999,
    "discount": 0,
    "taxableAmount": 59321.19,
    "cgst": 5338.91,
    "sgst": 5338.91,
    "grandTotal": 69999,
    "paymentMethod": "UPI (Paytm)",
    "amountPaid": 69999,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0008",
    "date": "2026-03-14",
    "customerName": "Sneha Kulkarni",
    "customerMobile": "+91 93890 12345",
    "customerAddress": "Tower 4, Indirapuram, Ghaziabad, UP",
    "items": [
      {
        "name": "Realme GT 6 5G (256GB - Fluid Silver)",
        "imei": "867452072222225",
        "qty": 1,
        "price": 40999,
        "discount": 0,
        "taxable": 34744.92,
        "taxRate": 18,
        "total": 40999
      }
    ],
    "subtotal": 40999,
    "discount": 0,
    "taxableAmount": 34744.92,
    "cgst": 3127.04,
    "sgst": 3127.04,
    "grandTotal": 40999,
    "paymentMethod": "Bank Transfer (NEFT)",
    "amountPaid": 40999,
    "balance": 0,
    "status": "Paid"
  },
  {
    "invoiceNo": "WM-INV-2026-0009",
    "date": "2026-03-14",
    "customerName": "Karan Kapoor",
    "customerMobile": "+91 92901 23456",
    "customerAddress": "D-Block, South Extension 1, New Delhi",
    "items": [
      {
        "name": "Motorola Edge 50 Ultra (512GB - Nordic Wood)",
        "imei": "867452073333335",
        "qty": 1,
        "price": 59999,
        "discount": 0,
        "taxable": 50846.61,
        "taxRate": 18,
        "total": 59999
      }
    ],
    "subtotal": 59999,
    "discount": 0,
    "taxableAmount": 50846.61,
    "cgst": 4576.2,
    "sgst": 4576.2,
    "grandTotal": 59999,
    "paymentMethod": "Credit Card (ICICI)",
    "amountPaid": 57499,
    "balance": 2500,
    "status": "Partial"
  },
  {
    "invoiceNo": "WM-INV-2026-0010",
    "date": "2026-03-15",
    "customerName": "Deepak Soni",
    "customerMobile": "+91 91012 34567",
    "customerAddress": "Shop 5, Chandni Chowk, Old Delhi",
    "items": [
      {
        "name": "Nothing Phone (2a) Plus (256GB - Metallic Grey)",
        "imei": "867452074444445",
        "qty": 1,
        "price": 27999,
        "discount": 0,
        "taxable": 23727.97,
        "taxRate": 18,
        "total": 27999
      }
    ],
    "subtotal": 27999,
    "discount": 0,
    "taxableAmount": 23727.97,
    "cgst": 2135.52,
    "sgst": 2135.52,
    "grandTotal": 27999,
    "paymentMethod": "Cash",
    "amountPaid": 27999,
    "balance": 0,
    "status": "Paid"
  }
];
