# Apollo Contacts Exporter

A Node.js application to fetch filtered contacts from the Apollo API and export specific fields (Name, Title, and Email) to an Excel file.

## Features
- Fetches contacts filtered by job title, location, and verification status.
- Extracts only the required fields: **Name**, **Title**, and **Email**.
- Exports the extracted data to an Excel file (`FilteredContacts.xlsx`).

---

## Prerequisites

### **1. Node.js**
Ensure you have Node.js installed on your system. You can download it from [Node.js Official Website](https://nodejs.org).

### **2. Apollo API Key**
You need an Apollo API key to access their API. Obtain your key from your Apollo account settings.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/huscse/retrieving-data.git
   cd Apollo-contacts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install the required `xlsx` library:
   ```bash
   npm install xlsx
   ```

---

## Usage

1. Open the `index.js` file and replace the placeholder API key with your Apollo API key:
   ```javascript
   'x-api-key': 'YOUR_API_KEY', // Replace with your Apollo API key
   ```

2. Run the script:
   ```bash
   node index.js
   ```

3. After the script runs successfully, an Excel file named `FilteredContacts.xlsx` will be generated in the current directory.

---

## Code Explanation

### **API Request**
The script sends a POST request to Apollo's **Search for Contacts** endpoint with the following parameters:
- `title`: Filters for contacts with the title "Environmental Engineer."
- `state`: Filters for contacts located in "California."
- `is_verified`: Filters for verified contacts.
- `per_page`: Limits the results to 5.

### **Data Processing**
The response is processed to extract only the `name`, `title`, and `email` fields using JavaScript's `map` function.

### **Excel Export**
The filtered data is converted to an Excel sheet using the `xlsx` library and saved as `FilteredContacts.xlsx`.

---

## Example Output

### **FilteredContacts.xlsx**
| Name         | Title                  | Email                   |
|--------------|------------------------|-------------------------|
| Jane Doe     | Environmental Engineer | jane.doe@example.com    |
| John Smith   | Environmental Engineer | john.smith@example.com  |

---

## Dependencies
- [`node-fetch`](https://www.npmjs.com/package/node-fetch): For making API requests.
- [`xlsx`](https://www.npmjs.com/package/xlsx): For handling Excel file generation.

---

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## Issues
If you encounter any issues, feel free to [open an issue](https://github.com/huscse/retrieving-data/issues).

