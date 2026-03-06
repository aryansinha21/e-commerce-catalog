import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const products = [
  { name: 'Laptop', description: 'High-performance laptop', price: 999.99, sku: 'LAP001' },
  { name: 'Smartphone', description: 'Latest smartphone model', price: 699.99, sku: 'SPH001' },
  { name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99, sku: 'HDP001' },
  { name: 'Tablet', description: '10-inch tablet', price: 399.99, sku: 'TAB001' },
  { name: 'Smartwatch', description: 'Fitness smartwatch', price: 299.99, sku: 'SWT001' },
  { name: 'Keyboard', description: 'Mechanical keyboard', price: 129.99, sku: 'KBD001' },
  { name: 'Mouse', description: 'Wireless mouse', price: 49.99, sku: 'MSE001' },
  { name: 'Monitor', description: '27-inch 4K monitor', price: 499.99, sku: 'MON001' },
  { name: 'Printer', description: 'All-in-one printer', price: 199.99, sku: 'PRT001' },
  { name: 'Router', description: 'Wi-Fi router', price: 89.99, sku: 'RTR001' },
  { name: 'External Hard Drive', description: '2TB external HDD', price: 79.99, sku: 'HDD001' },
  { name: 'USB Flash Drive', description: '64GB USB drive', price: 19.99, sku: 'USB001' },
  { name: 'Webcam', description: 'HD webcam', price: 59.99, sku: 'WBC001' },
  { name: 'Microphone', description: 'USB microphone', price: 99.99, sku: 'MIC001' },
  { name: 'Speakers', description: 'Bluetooth speakers', price: 149.99, sku: 'SPK001' },
  { name: 'Graphics Card', description: 'RTX 3060 GPU', price: 399.99, sku: 'GPU001' },
  { name: 'RAM Module', description: '16GB DDR4 RAM', price: 89.99, sku: 'RAM001' },
  { name: 'SSD', description: '500GB NVMe SSD', price: 79.99, sku: 'SSD001' },
  { name: 'Power Supply', description: '650W PSU', price: 69.99, sku: 'PSU001' },
  { name: 'Case', description: 'Mid-tower PC case', price: 59.99, sku: 'CAS001' },
  { name: 'Cooler', description: 'CPU air cooler', price: 39.99, sku: 'CLR001' },
  { name: 'Motherboard', description: 'ATX motherboard', price: 149.99, sku: 'MB001' },
  { name: 'Drone', description: 'Quadcopter drone', price: 299.99, sku: 'DRN001' },
  { name: 'Camera', description: 'DSLR camera', price: 799.99, sku: 'CAM001' },
  { name: 'Lens', description: '50mm prime lens', price: 199.99, sku: 'LEN001' },
  { name: 'Tripod', description: 'Camera tripod', price: 49.99, sku: 'TRP001' },
  { name: 'VR Headset', description: 'Virtual reality headset', price: 399.99, sku: 'VRH001' },
  { name: 'Gaming Console', description: 'Next-gen gaming console', price: 499.99, sku: 'GMC001' },
  { name: 'Controller', description: 'Wireless game controller', price: 59.99, sku: 'CTL001' },
  { name: 'Headset', description: 'Gaming headset', price: 79.99, sku: 'HST001' },
  { name: 'E-reader', description: 'Electronic book reader', price: 129.99, sku: 'ERD001' },
  { name: 'Smart Home Hub', description: 'Voice assistant hub', price: 99.99, sku: 'SHH001' },
  { name: 'Smart Bulb', description: 'Wi-Fi smart bulb', price: 19.99, sku: 'SBL001' },
  { name: 'Thermostat', description: 'Smart thermostat', price: 199.99, sku: 'THM001' },
  { name: 'Security Camera', description: 'Wireless security camera', price: 149.99, sku: 'SCC001' },
  { name: 'Doorbell', description: 'Smart video doorbell', price: 179.99, sku: 'DBL001' },
  { name: 'Robot Vacuum', description: 'Autonomous vacuum cleaner', price: 299.99, sku: 'RVC001' },
  { name: 'Air Purifier', description: 'HEPA air purifier', price: 199.99, sku: 'APR001' },
  { name: 'Coffee Maker', description: 'Smart coffee maker', price: 149.99, sku: 'CFM001' },
  { name: 'Blender', description: 'High-speed blender', price: 79.99, sku: 'BLD001' },
  { name: 'Toaster', description: '4-slice toaster', price: 39.99, sku: 'TST001' },
  { name: 'Microwave', description: 'Countertop microwave', price: 99.99, sku: 'MCW001' },
  { name: 'Refrigerator', description: 'Mini fridge', price: 199.99, sku: 'RFG001' },
  { name: 'Washing Machine', description: 'Compact washer', price: 399.99, sku: 'WSM001' },
  { name: 'Dryer', description: 'Vented dryer', price: 349.99, sku: 'DRY001' },
  { name: 'Dishwasher', description: 'Portable dishwasher', price: 299.99, sku: 'DSH001' },
  { name: 'Vacuum Cleaner', description: 'Cordless vacuum', price: 149.99, sku: 'VCM001' },
  { name: 'Iron', description: 'Steam iron', price: 29.99, sku: 'IRN001' },
  { name: 'Hair Dryer', description: 'Ionic hair dryer', price: 49.99, sku: 'HDR001' },
  { name: 'Electric Toothbrush', description: 'Rechargeable toothbrush', price: 79.99, sku: 'ETB001' },
  { name: 'Fitness Tracker', description: 'Activity tracker', price: 99.99, sku: 'FTR001' },
  { name: 'Yoga Mat', description: 'Non-slip yoga mat', price: 29.99, sku: 'YMT001' },
  { name: 'Dumbbells', description: 'Adjustable dumbbells', price: 149.99, sku: 'DMB001' },
  { name: 'Treadmill', description: 'Foldable treadmill', price: 599.99, sku: 'TRD001' },
  { name: 'Bike', description: 'Stationary exercise bike', price: 399.99, sku: 'BIK001' },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();