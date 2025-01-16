const fs = require('fs');
const XLSX = require('xlsx');

const fetchContacts = async (totalContacts) => {
  const apiKey = 'Your API key'; 
  const perPage = 25; // Number of results per page
  const totalPages = Math.ceil(totalContacts / perPage); // Calculate total pages
  let allContacts = [];

  for (let page = 1; page <= totalPages; page++) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        page: page, // Fetch current page
        per_page: perPage, // Results per page
        query: {
          title: "Environmental Engineer", // Filter by title
          state: "California", // Filter by state
          is_verified: true, // Only verified contacts
        },
      }),
    };

    console.log(`Fetching page ${page}...`);
    try {
      const res = await fetch('https://api.apollo.io/api/v1/contacts/search', options);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      // Add contacts to the array
      const filteredContacts = data.contacts.map((contact) => ({
        Name: contact.name,
        Title: contact.title,
        Email: contact.email,
        State: contact.state,
      }));

      allContacts = [...allContacts, ...filteredContacts];

      // Break early if fewer contacts are returned than requested
      if (filteredContacts.length < perPage) break;
    } catch (err) {
      console.error(`Error fetching page ${page}:`, err);
    }
  }

  return allContacts;
};

// to fetch contacts and save to excel
const main = async () => {
  const totalContacts = 300; // Set the desired number of contacts as needed (check credits too)
  const contacts = await fetchContacts(totalContacts);

  console.log(`Total Contacts Fetched: ${contacts.length}`);
  console.log('Filtered Contacts:', contacts);

  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(contacts);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

  // Save the workbook to a file
  XLSX.writeFile(workbook, 'FilteredContacts.xlsx');

  console.log('Excel file created: FilteredContacts.xlsx');
};

main().catch((err) => console.error('Error in main function:', err));
