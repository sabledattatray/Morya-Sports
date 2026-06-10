# MORYA SPORTS BADLAPUR – WEBSITE PRD

Build an ultra-premium, modern, mobile-first eCommerce website for Morya Sports Badlapur, a sports equipment, sportswear, custom jersey printing, and trophy shop located in Badlapur, Maharashtra, India.

---

## 1. Project Overview

### 1.1 Brand Identity
* **Store Name:** Morya Sports Badlapur
* **Address:** Shop No 15, Bebika Palace, Adarsh College Road, Badlapur East, Maharashtra 421503
* **Contact Number:** 08104812757
* **Brand Colors:** Deep Saffron/Sports Red (`#FF4D4D`) and Golden Amber (`#FFB800`)
* **Design Philosophy:** Vibrant, athletic, high-contrast, premium dark/light mode support.

### 1.2 Target Audience
* Local athletes, fitness enthusiasts, and sports players in Badlapur.
* Local schools, colleges, and sports clubs looking for bulk equipment, sportswear, custom team jerseys, and trophies.

---

## 2. Core Functional Requirements

### 2.1 Customer Facing Features

#### Product Catalog & Filtering
* **Categories:**
  - Cricket 🏏
  - Football & Outdoor Sports ⚽
  - Badminton & Tennis 🏸
  - Jerseys & Sportswear (Sublimation & Custom Printing) 👕
  - Kabaddi & Wrestling 🤼
  - Athletics & Running 🏃
  - Trophies & Medals 🏆
  - Gym & Fitness 🏋️
  - School Sports Kits 🎒
* **Dynamic Search:** Instant search by product name, category, or brand.
* **Product Details:** Visual image gallery, specifications table, and direct WhatsApp enquiry trigger.

#### Shopping Cart & Checkout
* **Persistent Cart:** Using Zustand local storage persistence.
* **Customization Tag Option:** Option to add custom labels or name printing to items in the cart.
* **3-Step Checkout:** Standard address form, shipping method selection, and payment options.
* **Simulated Payment Gateway:** Simulated Razorpay secure popup with QR code scanning.
* **GST Invoice Generation:** Automatic tax breakdown (CGST/SGST) and download option.

#### Order Tracking
* Real-time timeline tracker at `/track-order`.
* Statuses: Placed → Confirmed → Packed → Out for Delivery/Ready for Pickup → Delivered.
* Direct WhatsApp status notifications and verification links.

---

## 3. Store Administration Panel

### 3.1 Inventory Management
* Add new products with customized categories.
* Stock counters with low-stock warnings (≤5 units highlighted).

### 3.2 Order Status Control
* Review incoming orders.
* Advance order tracking stages and trigger direct customer WhatsApp notifications.

### 3.3 Delivery Configuration
* Set local delivery radius (default 8 km), base fees, and free delivery thresholds.

---

## 4. Technical Architecture

* **Framework:** Next.js 16 (App Router)
* **Styling:** Tailwind CSS v4
* **State Management:** Zustand (with persist middleware)
* **Icons:** Lucide React
* **Type System:** TypeScript
