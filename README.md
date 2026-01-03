<div align="center">
  <img src="https://img.shields.io/badge/Status-Complete-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Author-bilalali6-orange?style=for-the-badge" />
  <br />
  <h1>🚀 Etsy Order Fulfillment Automation</h1>
  <p><strong>A custom-built pipeline connecting Make.com, Google Apps Script, and Google Drive</strong></p>
  
  <div align="center">
    <img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=flat-square&logo=google-apps-script&logoColor=white" />
    <img src="https://img.shields.io/badge/Make.com-000000?style=flat-square&logo=make&logoColor=white" />
    <img src="https://img.shields.io/badge/Google_Sheets-34A853?style=flat-square&logo=google-sheets&logoColor=white" />
    <img src="https://img.shields.io/badge/Automation-Engineer-blueviolet?style=flat-square" />
  </div>
</div>

---

## 📝 Project Overview
This project solves a common pain point for high-volume Etsy sellers: **Manual File Retrieval.** Instead of staff searching for artwork files one by one, this system triggers the moment an order is sold, generates a specific SKU, and delivers the print-ready file to a "Hot Folder" for immediate fulfillment.

### 🏗 Architecture & Workflow
1.  **Ingestion:** Etsy "Sold Order" emails are sent to a **Make.com** Mailhook.
2.  **Parsing:** Regex extracts Order ID, Title, Size, and Personalization details.
3.  **Queueing:** Data is pushed to a **Google Sheets** database.
4.  **Processing:** A **Google Apps Script** (GAS) reads the queue, creates a unique SKU filename, and executes a targeted search across multiple Google Drive sub-directories.
5.  **Delivery:** The found file is copied to the `CG-OUT` folder and the sheet is updated to "Done."

---

## 🛠 Installation & Usage Guide

### 1. Database Setup
* Create a Google Sheet with the following columns: `Order ID`, `Title`, `Size`, `Frame`, `Personalization`, `SKU`, and `Status`.
* Name the tab **"Etsy Orders"**.

### 2. Drive Organization
Create the following folder structure:
* `a-others/` (For Standard and Framed types)
* `b-blueprints/` (For Blueprints and Custom Text)
* `CG-OUT/` (The final output destination)

### 3. Script Deployment
* Open **Extensions > Apps Script** in your Google Sheet.
* Copy the `Code.gs` from this repository.
* Replace the `FOLDER_IDs` in the script with your actual Google Drive folder IDs.

### 4. Running the Automation
* The script can be run manually via the `processOrders` function or set on a **Time-Based Trigger** (e.g., every 15 minutes) to handle new orders automatically.

---

## 🖼️ Technical Demonstration

### 1. The Initial Order Queue (Raw Data)
Before the script runs, the Google Sheet acts as a landing zone for raw order data captured from Etsy emails. This includes specific customer requests and personalization.

<div align="center">
<img width="452" height="135" alt="Picture1" src="https://github.com/user-attachments/assets/4e8d61ce-3bea-4645-a1b4-7199a82f72db" />

  <p><i>Figure 1: The incoming order queue with raw metadata and empty fulfillment columns.</i></p>
</div>

### The Logic Engine (GAS)
The script includes advanced error handling to ensure the fulfillment line never stops. If a folder is missing or a file isn't found, it logs the error and moves to the next order.

<div align="center">
<img width="452" height="205" alt="Picture2" src="https://github.com/user-attachments/assets/868bd0b0-ab1b-4dd3-af02-bb26a2be16ad" />
 <p><i>Figure 1: Google Apps Script processing order rows in real-time.</i></p>
</div>

### Order Database & SKU Generation
The automation dynamically builds SKUs based on product logic. For example: `V99_MyArtwork_24x18.jpg`.

<div align="center">
<img width="452" height="188" alt="Picture3" src="https://github.com/user-attachments/assets/1b83fafc-e954-4940-9daa-f0eeae1f65c7" />
  <p><i>Figure 2: The Google Sheets queue showing completed orders and SKU generation.</i></p>
</div>

---

## ⚠️ Error Handling & Logs
Reliability is the core of this system. When a file is missing from the database, the script doesn't just fail; it logs the specific issue to a secondary "Errors" sheet so the seller can address the missing asset immediately.

<div align="center">
<img width="452" height="189" alt="Picture4" src="https://github.com/user-attachments/assets/a11666e0-a003-4459-9fa5-ac72aa8a8749" />
  <p><i>Figure 3: Automated error logging for missing assets.</i></p>
</div>

---

## 📂 Final Output
Once processed, the print-ready files appear in the destination folder with standardized names, ready for the production team.

<div align="center">
<img width="452" height="221" alt="Picture5" src="https://github.com/user-attachments/assets/5be6ea12-4b29-4c68-bdfe-dc6b78c2131f" />
  <p><i>Figure 4: The CG-OUT folder populated with renamed, ready-to-print files.</i></p>
</div>

---

## 🚀 Key Benefits
* **Efficiency:** Reduces human interaction by 90%+.
* **Scalability:** Handles 1 order or 1,000 orders with the same accuracy.
* **Accuracy:** Eliminates "Wrong File" shipping errors via SKU-matching logic.

---

<div align="center">
  <h3>📫 Contact & Support</h3>
  <p>Developed by <b>bilalali6</b></p>
  <a href="https://github.com/bilalali6">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github" />
  </a>
</div>
